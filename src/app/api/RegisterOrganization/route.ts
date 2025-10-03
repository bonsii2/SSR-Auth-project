import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest){

    const body = await req.json();
    const {name, email} = body;

    const {data, error} = await supabase
    .from('organization')
    .insert([{name, email}]);

    if(error) return NextResponse.json({error: error.message}, {status: 400});

    return NextResponse.json({success: true, data})
}