
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export  default async function Page(){
const supabase = createServerComponentClient({cookies});

  const {data: {user}} = await supabase.auth.getUser();

  if(!user){
    redirect('/login')
  }
  
    return (
      <>
         
        <div>dashboard Page</div>
        <form action="/api/auth/logout" method="post">
        <button type="submit">logout</button>
        </form>
        
      </>
    );
}