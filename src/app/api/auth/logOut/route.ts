import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase signOut error:", error);
      // Return a JSON error if it's an AJAX call, otherwise redirect with a query param
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Good practice: use 303 after a POST to redirect with a GET
    return NextResponse.redirect(url.origin, { status: 303 });
  } catch (err) {
    console.error("Unexpected logout error:", err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
