import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if(code){
    const cookiesStore = cookies();
    const supabase = createRouteHandlerClient({
        cookies: ()=> cookiesStore
    });

    await supabase 
    .auth
    .exchangeCodeForSession(code)
  }

    return NextResponse.redirect(url.origin);
}