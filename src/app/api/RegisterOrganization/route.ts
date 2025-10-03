import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/hooks/useSupabase";

export async function POST(req: NextRequest){

try{
    
  

    const body = await req.json();
    console.log("API body:", body);
    const {name, phone, location} = body;

    const {data, error} = await supabase
    .from('organization')
    .insert([{name, phone, location}]);

    if(error) return NextResponse.json({error: error.message}, {status: 400});

    return NextResponse.json({success: true, data})
}catch(err){
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}