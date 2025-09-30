
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(req: NextRequest){
 const url = new URL(req.url);
const cookiesStore = cookies();

const formData = await req.formData();
const email = String(formData.get('email'));
const password = String(formData.get('password'));


const supabase = createRouteHandlerClient({
    cookies: () => cookiesStore
})

// await supabase
// .auth
// .signInWithPassword(
//     {
//         email, password,
//         options:{
//             emailRedirectTo: `$(url.origin)/auth/callback`
//         }
//     }
// )




    return NextResponse.redirect(url.origin, {
        status: 301
    })
}