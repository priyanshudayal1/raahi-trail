import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/adminSession";
import { deleteCloudinaryImage, uploadCloudinaryImage } from "../../../lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const slug = String(formData.get("slug") || "draft").replace(/[^a-z0-9-]/gi, "-");
    const kind = String(formData.get("kind") || "gallery");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const result = await uploadCloudinaryImage(
      file,
      `raahi-trail/trips/${slug}/${kind}`,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload image right now.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { publicId?: string };

    await deleteCloudinaryImage(body.publicId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cloudinary delete failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to delete image right now.",
      },
      { status: 500 },
    );
  }
}
