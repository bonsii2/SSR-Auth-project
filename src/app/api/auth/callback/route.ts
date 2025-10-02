import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const redirectTo = url.searchParams.get('redirect_to') || "/dashboard" ;

  const res = NextResponse.redirect(new URL(redirectTo , url.origin));
  const cookiesStore = cookies()
   const supabase = createRouteHandlerClient({cookies: () => cookiesStore  });
  if(code){

   

    await supabase 
    .auth
    .exchangeCodeForSession(code)
  }

    return NextResponse.redirect(new URL(redirectTo, url.origin));

}