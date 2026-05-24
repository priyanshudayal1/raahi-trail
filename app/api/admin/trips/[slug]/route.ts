import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../../lib/adminSession";
import { deleteTripFromDb } from "../../../../lib/tripsDb";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: "Trip slug is required." }, { status: 400 });
  }

  await deleteTripFromDb(slug);
  revalidatePath("/");
  revalidatePath("/trips");
  revalidatePath(`/trips/${slug}`);

  return NextResponse.json({ ok: true });
}
