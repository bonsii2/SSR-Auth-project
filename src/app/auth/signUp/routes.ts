import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(req: NextRequest){
 const url = new URL(req.url);
const cookiesStore = cookies();

const formData = await req.formData();
const email = String(formData.get('email'));
const password = String(formData.get('password'));

if(!email || !password){
    return NextResponse.json({error: "email and password are required"}, {status: 400 });
}


const supabase = createRouteHandlerClient({
    cookies: () => cookiesStore
})

const {data, error} = await supabase
.auth
.signUp(
    {
        email, password,
        options:{
            emailRedirectTo: `${url.origin}/auth/callback`
        }
    }
)

console.log('SignUp Response:', { data, error });
console.log('User:', data.user);
console.log('Session:', data.session);

if(error){
    console.error('signup error' , error);
    return NextResponse.json({
        error: error.message
    }, {status: 400});
}

if(!data.user){
    console.error('no user data returned');
    return NextResponse.json({
        error: "user creation failed"
    },{status: 400});
}

console.log('user created:' , data.user.id);
console.log('email confirmation required:' , data.user.confirmed_at ? 'no': 'yes');


    return NextResponse.redirect(`${url.origin}/login`, {
        status: 302
    })
}