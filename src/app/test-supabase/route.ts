import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookiesStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookiesStore
    });

    // Test connection
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    
    return NextResponse.json({
      supabaseConnected: !error,
      error: error?.message,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'
    });
  } catch (error) {
    return NextResponse.json({
      supabaseConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}