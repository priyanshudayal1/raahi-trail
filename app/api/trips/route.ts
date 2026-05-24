import { NextResponse } from "next/server";
import { getTripDestinationsFromDb, queryTripsFromDb } from "../../lib/tripsDb";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await queryTripsFromDb({
    budget: searchParams.get("budget") ?? "all",
    destination: searchParams.get("destination") ?? "all",
    duration: searchParams.get("duration") ?? "all",
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? 9),
    search: searchParams.get("search") ?? "",
  });
  const destinations = await getTripDestinationsFromDb();

  return NextResponse.json({ ...result, destinations });
}
