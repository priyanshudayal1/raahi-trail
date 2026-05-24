import { NextResponse } from "next/server";
import { verifyAdminLogin } from "../../../lib/adminAuth";
import { createAdminSession } from "../../../lib/adminSession";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 },
      );
    }

    const result = await verifyAdminLogin(username, password);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    await createAdminSession(result.username);

    return NextResponse.json({ username: result.username });
  } catch (error) {
    console.error("Admin login failed", error);

    if (error instanceof Error && error.message.includes("Firebase Admin")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Unable to login right now." },
      { status: 500 },
    );
  }
}
