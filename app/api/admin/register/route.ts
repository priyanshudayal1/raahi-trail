import { NextResponse } from "next/server";
import { registerAdmin } from "../../../lib/adminAuth";
import { createAdminSession } from "../../../lib/adminSession";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
      secretKey?: string;
    };

    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";
    const secretKey = body.secretKey ?? "";

    if (!username || !password || !secretKey) {
      return NextResponse.json(
        { error: "Username, password, and secret key are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    if (secretKey !== process.env.ADMIN_REGISTRATION_SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid admin registration secret key." },
        { status: 403 },
      );
    }

    const result = await registerAdmin(username, password);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    await createAdminSession(result.username);

    return NextResponse.json({ username: result.username });
  } catch (error) {
    console.error("Admin registration failed", error);

    if (error instanceof Error && error.message.includes("Firebase Admin")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Unable to register admin right now." },
      { status: 500 },
    );
  }
}
