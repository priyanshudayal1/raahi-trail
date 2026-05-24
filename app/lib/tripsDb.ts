import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { deleteCloudinaryImages } from "./cloudinary";
import { getAdminDb } from "./firebaseAdmin";
import { trips as seedTrips, type Trip } from "./trips";

const tripsCollection = "trips";

export async function getTripsFromDb(): Promise<Trip[]> {
  const snapshot = await getAdminDb().collection(tripsCollection).get();

  if (snapshot.empty) {
    return seedTrips;
  }

  return snapshot.docs
    .map((doc) => normalizeTrip(doc.data(), doc.id))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getTripBySlugFromDb(slug: string): Promise<Trip | null> {
  const snapshot = await getAdminDb().collection(tripsCollection).doc(slug).get();

  if (!snapshot.exists) {
    return seedTrips.find((trip) => trip.slug === slug) ?? null;
  }

  return normalizeTrip(snapshot.data(), snapshot.id);
}

export async function saveTripToDb(trip: Trip, previousSlug?: string) {
  const db = getAdminDb();
  const batch = db.batch();
  const nextRef = db.collection(tripsCollection).doc(trip.slug);
  const previousTrip = await getExistingTrip(previousSlug || trip.slug);

  if (previousSlug && previousSlug !== trip.slug) {
    batch.delete(db.collection(tripsCollection).doc(previousSlug));
  }

  batch.set(nextRef, {
    ...trip,
    updatedAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();
  await deleteCloudinaryImages(getRemovedPublicIds(previousTrip, trip));
}

export async function deleteTripFromDb(slug: string) {
  const trip = await getExistingTrip(slug);

  await getAdminDb().collection(tripsCollection).doc(slug).delete();
  await deleteCloudinaryImages(getTripPublicIds(trip));
}

export async function seedTripsToDb() {
  const db = getAdminDb();
  const batch = db.batch();

  seedTrips.forEach((trip) => {
    batch.set(db.collection(tripsCollection).doc(trip.slug), {
      ...trip,
      seededAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  return seedTrips;
}

function normalizeTrip(data: FirebaseFirestore.DocumentData | undefined, slug: string): Trip {
  const trip = data ?? {};

  return {
    slug: stringValue(trip.slug, slug),
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
