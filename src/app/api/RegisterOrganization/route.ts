import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/hooks/useSupabase";

export async function POST(req: NextRequest){

try{
    const formData = await req.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const location = formData.get('location');
    const logo = formData.get('logo') as File | null;
    let logoUrl: string | null = null;

    if(logo){
        const fileExt = logo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`

        const {error: uploadError} = await supabase.storage
        .from('logos')
        .upload(fileName, logo)

        if(uploadError){
            return NextResponse.json({error: "logo is not uploaded" + uploadError.message})
        }

        const {data: urlData} = supabase.storage
        .from('logos')
        .getPublicUrl(fileName)

   if(!urlData.publicUrl){
    console.log('tere is no public url')
   }else{
    logoUrl = urlData.publicUrl;
   }

       

    }


    const {data, error} = await supabase
    .from('organization')
    .insert([{name, phone, location, logo: logoUrl}]);

    if(error) return NextResponse.json({error: error.message}, {status: 400});

    return NextResponse.json({success: true, data})
}catch(err){
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}