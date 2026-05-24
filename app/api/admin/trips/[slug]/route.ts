import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminSession";
import { deleteTripFromDb, getTripByIdFromDb } from "../../../../lib/tripsDb";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { slug: id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Trip id is required." }, { status: 400 });
  }

  const trip = await getTripByIdFromDb(id);

  await deleteTripFromDb(id);
  revalidatePath("/");
  revalidatePath("/trips");
  if (trip?.slug) {
    revalidatePath(`/trips/${trip.slug}`);
  }

  return NextResponse.json({ ok: true });
}
