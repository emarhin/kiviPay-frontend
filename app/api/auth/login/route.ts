import { NextResponse } from "next/server";
import { callExternalApi } from "@/lib/externalApi";
import { signToken } from "@/lib/jwt";
import API_PATHS from "@/lib/api-urls";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 },
      );
    }

    // 🔥 Call External API Signin
    const externalResponse = await callExternalApi("/signin", "POST", {
      email,
      password,
    });

    // Assume external API returns:
    // {
    //   token: "externalToken",
    //   user: { id, name, email, role }
    // }

    const { token: externalToken, user } = externalResponse;

    // 🔐 Sign YOUR application JWT
    const appToken = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      externalToken, // store external token inside JWT
    });

    return NextResponse.json({
      success: true,
      token: appToken,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid credentials or external API error" },
      { status: 401 },
    );
  }
}
