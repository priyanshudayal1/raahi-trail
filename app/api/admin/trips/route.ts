import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/adminSession";
import { getTripByIdFromDb, getTripDestinationsFromDb, queryTripsFromDb, saveTripToDb } from "../../../lib/tripsDb";
import type { Trip } from "../../../lib/trips";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const result = await queryTripsFromDb({
    budget: searchParams.get("budget") ?? "all",
    destination: searchParams.get("destination") ?? "all",
    duration: searchParams.get("duration") ?? "all",
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? 6),
    search: searchParams.get("search") ?? "",
  });
  const destinations = await getTripDestinationsFromDb();

  return NextResponse.json({ ...result, destinations });
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    trip?: Trip;
    previousId?: string;
  };

  if (!body.trip?.slug) {
    return NextResponse.json({ error: "Trip slug is required." }, { status: 400 });
  }

  const previousTrip = body.previousId
    ? await getTripByIdFromDb(body.previousId)
    : null;
  const trip = await saveTripToDb(body.trip, body.previousId);
  revalidateTripPaths(trip.slug, previousTrip?.slug);

  return NextResponse.json({ trip });
}

function revalidateTripPaths(slug: string, previousSlug?: string) {
  revalidatePath("/");
  revalidatePath("/trips");
  revalidatePath(`/trips/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/trips/${previousSlug}`);
  }
}
