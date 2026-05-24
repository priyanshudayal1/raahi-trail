import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminSession";
import { seedTripsToDb } from "../../../../lib/tripsDb";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  const secret = request.headers.get("x-admin-secret");

  if (!session && secret !== process.env.ADMIN_REGISTRATION_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const trips = await seedTripsToDb();
  revalidatePath("/");
  revalidatePath("/trips");

  return NextResponse.json({ trips });
}
