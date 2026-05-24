import "server-only";

import { createHash, randomUUID } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { deleteCloudinaryImages } from "./cloudinary";
import { getAdminDb } from "./firebaseAdmin";
import { trips as seedTrips, type Trip } from "./trips";

const tripsCollection = "trips";
const maxCandidateTrips = 200;

export type TripQueryOptions = {
  budget?: string;
  destination?: string;
  duration?: string;
  page?: number;
  pageSize?: number;
  search?: string;
};

export type TripQueryResult = {
  trips: Trip[];
  total: number;
  page: number;
  pageSize: number;
};

export async function getTripsFromDb(): Promise<Trip[]> {
  const snapshot = await getAdminDb().collection(tripsCollection).get();

  if (snapshot.empty) {
    return getSeedTripsWithIds();
  }

  return snapshot.docs
    .map((doc) => normalizeTrip(doc.data(), doc.id))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function queryTripsFromDb(
  options: TripQueryOptions = {},
): Promise<TripQueryResult> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(24, Math.max(1, options.pageSize ?? 6));
  const search = normalizeSearchTerm(options.search ?? "");
  const destination = options.destination ?? "all";
  const needsServerFilter =
    (options.budget && options.budget !== "all") ||
    (options.duration && options.duration !== "all");
  let query: FirebaseFirestore.Query = getAdminDb().collection(tripsCollection);

  if (search) {
    query = query.where("searchTokens", "array-contains", search);
  }

  if (destination !== "all") {
    query = query.where("destination", "==", destination);
  }

  if (!needsServerFilter) {
    const countSnapshot = await query.count().get();
    const pagedQuery = search
      ? query.offset((page - 1) * pageSize).limit(pageSize)
      : query.orderBy("title").offset((page - 1) * pageSize).limit(pageSize);
    const snapshot = await pagedQuery.get();

    return {
      trips: snapshot.docs.map((doc) => normalizeTrip(doc.data(), doc.id)),
      total: countSnapshot.data().count,
      page,
      pageSize,
    };
  }

  const candidateQuery = search ? query : query.orderBy("title");
  const snapshot = await candidateQuery.limit(maxCandidateTrips).get();
  const filteredTrips = snapshot.docs
    .map((doc) => normalizeTrip(doc.data(), doc.id))
    .filter((trip) => matchesBudget(trip, options.budget ?? "all"))
    .filter((trip) => matchesDuration(trip, options.duration ?? "all"));

  return {
    trips: filteredTrips.slice((page - 1) * pageSize, page * pageSize),
    total: filteredTrips.length,
    page,
    pageSize,
  };
}

export async function getTripDestinationsFromDb() {
  const snapshot = await getAdminDb().collection(tripsCollection).select("destination").get();
  const destinations = snapshot.docs
    .map((doc) => stringValue(doc.data().destination))
    .filter(Boolean);

  if (destinations.length === 0) {
    return Array.from(new Set(getSeedTripsWithIds().map((trip) => trip.destination))).sort();
  }

  return Array.from(new Set(destinations)).sort();
}

export async function getTripBySlugFromDb(slug: string): Promise<Trip | null> {
  const snapshot = await getAdminDb()
    .collection(tripsCollection)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return getSeedTripsWithIds().find((trip) => trip.slug === slug) ?? null;
  }

  return normalizeTrip(snapshot.docs[0].data(), snapshot.docs[0].id);
}

export async function getTripByIdFromDb(id: string): Promise<Trip | null> {
  const snapshot = await getAdminDb().collection(tripsCollection).doc(id).get();

  return snapshot.exists ? normalizeTrip(snapshot.data(), snapshot.id) : null;
}

export async function saveTripToDb(trip: Trip, previousId?: string) {
  const db = getAdminDb();
  const batch = db.batch();
  const id = trip.id || previousId || randomUUID();
  const nextTrip = { ...trip, id };
  const nextRef = db.collection(tripsCollection).doc(id);
  const previousTrip = previousId ? await getExistingTrip(previousId) : null;

  if (previousId && previousId !== id) {
    batch.delete(db.collection(tripsCollection).doc(previousId));
  }

  batch.set(nextRef, {
    ...nextTrip,
    searchTokens: buildSearchTokens(nextTrip),
    updatedAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();
  await deleteCloudinaryImages(getRemovedPublicIds(previousTrip, nextTrip));

  return nextTrip;
}

export async function deleteTripFromDb(id: string) {
  const trip = await getExistingTrip(id);

  await getAdminDb().collection(tripsCollection).doc(id).delete();
  await deleteCloudinaryImages(getTripPublicIds(trip));
}

export async function seedTripsToDb() {
  const db = getAdminDb();
  const existingTrips = await db.collection(tripsCollection).get();
  const existingPublicIds = existingTrips.docs.flatMap((doc) =>
    getTripPublicIds(normalizeTrip(doc.data(), doc.id)),
  );
  const cleanupBatch = db.batch();

  existingTrips.docs.forEach((doc) => {
    cleanupBatch.delete(doc.ref);
  });

  await cleanupBatch.commit();
  await deleteCloudinaryImages(existingPublicIds);

  const batch = db.batch();

  getSeedTripsWithIds().forEach((tripWithId) => {
    batch.set(db.collection(tripsCollection).doc(tripWithId.id), {
      ...tripWithId,
      searchTokens: buildSearchTokens(tripWithId),
      seededAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  return getSeedTripsWithIds();
}

function normalizeTrip(data: FirebaseFirestore.DocumentData | undefined, slug: string): Trip {
  const trip = data ?? {};

  return {
    slug: stringValue(trip.slug, slug),
    id: stringValue(trip.id, slug),
    title: stringValue(trip.title),
    region: stringValue(trip.region),
    destination: stringValue(trip.destination),
    tagline: stringValue(trip.tagline),
    image: stringValue(trip.image),
    imagePublicId: stringValue(trip.imagePublicId) || undefined,
    durationDays: numberValue(trip.durationDays),
    durationNights: numberValue(trip.durationNights),
    groupSize: stringValue(trip.groupSize),
    date: stringValue(trip.date),
    price: numberValue(trip.price),
    originalPrice: numberValue(trip.originalPrice),
    difficulty: stringValue(trip.difficulty),
    highlights: stringArrayValue(trip.highlights),
    itinerary: itineraryValue(trip.itinerary),
    included: stringArrayValue(trip.included),
    excluded: stringArrayValue(trip.excluded),
    stay: stringValue(trip.stay),
    meetingPoint: stringValue(trip.meetingPoint),
    gallery: stringArrayValue(trip.gallery),
    galleryPublicIds: stringArrayValue(trip.galleryPublicIds),
  };
}

async function getExistingTrip(slug: string) {
  const snapshot = await getAdminDb().collection(tripsCollection).doc(slug).get();

  return snapshot.exists ? normalizeTrip(snapshot.data(), snapshot.id) : null;
}

function deterministicUuid(value: string) {
  const hash = createHash("sha256").update(value).digest("hex");

  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `5${hash.slice(13, 16)}`,
    `${((parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hash.slice(18, 20)}`,
    hash.slice(20, 32),
  ].join("-");
}

function getSeedTripsWithIds() {
  return seedTrips.map((trip) => ({
    ...trip,
    id: deterministicUuid(trip.slug),
  }));
}

function getTripPublicIds(trip: Trip | null) {
  if (!trip) {
    return [];
  }

  return [trip.imagePublicId, ...(trip.galleryPublicIds ?? [])];
}

function getRemovedPublicIds(previousTrip: Trip | null, nextTrip: Trip) {
  if (!previousTrip) {
    return [];
  }

  const nextIds = new Set(getTripPublicIds(nextTrip).filter(Boolean));
  return getTripPublicIds(previousTrip).filter(
    (publicId) => publicId && !nextIds.has(publicId),
  );
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function numberValue(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function stringArrayValue(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function itineraryValue(value: unknown): Trip["itinerary"] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => ({
      day:
        typeof item?.day === "number" && Number.isFinite(item.day)
          ? item.day
          : index + 1,
      title: stringValue(item?.title, `Day ${index + 1}`),
      description: stringValue(item?.description),
    }))
    .filter((item) => item.title || item.description);
}

function matchesBudget(trip: Trip, budget: string) {
  return (
    budget === "all" ||
    (budget === "under-10000" && trip.price < 10000) ||
    (budget === "10000-20000" && trip.price >= 10000 && trip.price <= 20000) ||
    (budget === "over-20000" && trip.price > 20000)
  );
}

function matchesDuration(trip: Trip, duration: string) {
  return (
    duration === "all" ||
    (duration === "short" && trip.durationDays <= 4) ||
    (duration === "medium" && trip.durationDays >= 5 && trip.durationDays <= 7) ||
    (duration === "long" && trip.durationDays >= 8)
  );
}

function buildSearchTokens(trip: Trip) {
  const source = [
    trip.slug,
    trip.title,
    trip.region,
    trip.destination,
    trip.tagline,
    trip.difficulty,
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ");
  const tokens = new Set<string>();

  source
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .forEach((token) => {
      for (let index = 1; index <= token.length; index += 1) {
        tokens.add(token.slice(0, index));
      }
    });

  return Array.from(tokens).slice(0, 500);
}

function normalizeSearchTerm(value: string) {
  return (
    value
    .trim()
    .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .find(Boolean) ?? ""
  );
}
