import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/adminSession";
import { getTripsFromDb, saveTripToDb } from "../../../lib/tripsDb";
import type { Trip } from "../../../lib/trips";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const trips = await getTripsFromDb();
  return NextResponse.json({ trips });
}

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    trip?: Trip;
    previousSlug?: string;
  };

  if (!body.trip?.slug) {
    return NextResponse.json({ error: "Trip slug is required." }, { status: 400 });
  }

  await saveTripToDb(body.trip, body.previousSlug);
  revalidateTripPaths(body.trip.slug, body.previousSlug);

  return NextResponse.json({ trip: body.trip });
}

function revalidateTripPaths(slug: string, previousSlug?: string) {
  revalidatePath("/");
  revalidatePath("/trips");
  revalidatePath(`/trips/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/trips/${previousSlug}`);
  }
}
