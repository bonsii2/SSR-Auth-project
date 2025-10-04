'use client'
import { useEffect, useState } from "react"
import { supabase } from "../hooks/useSupabase"

export default function EditProfile({orgId}: {orgId: string}){
 const [name, setName] = useState('')
 const [Phone, setPhone] = useState('')
 const [location, setLocation] = useState('');
 const [Logo, SetLogo] = useState<File | null>(null);
 const [logoUrl, setLogoUrl] = useState('')
    
 
useEffect(() =>{
   const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from("organization")
        .select("*")
        .eq("id", orgId)
        .single();

      if(data){
        setName(data.name);
        setLocation(data.location);
        setPhone(data.phone);
        SetLogo(data.logo);
      }
   };
    fetchOrganization();
}, [orgId])
  let finalUrl = logoUrl;
const handleUpdate = async () =>{


  if(Logo){
    const fileExt = Logo.name.split('.').pop();
    const fileName = `${Date.now()}_${fileExt}`;
    const {data, error} = await supabase.storage
    .from('logos')
    .upload(fileName, Logo);

    if(!error){
      const {data: {publicUrl}} = supabase.storage
      .from('logos')
      .getPublicUrl(fileName);

      finalUrl = publicUrl;
    }

  }


    const { error } = await supabase
      .from("organization")
      .update({ name, phone: Phone, location, logo: finalUrl })
      .eq('id', orgId)


    
    if(error){
        console.log('update faield' + error.message);
    }else{
        alert('updated succesfuly')
        console.log('updated seccussfully');
    }

}

    return(
       <div className="flex flex-col gap-1">
   <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
   <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
   <input type="tel" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
   <input type="file" name="logo" accept="image/*" onChange={(e) => SetLogo(e.target.files?.[0] || null)} />

   {Logo && (
    <img src={Logo} alt="logo of organization" className="w-35 h-35" />
   )
   }

 <button  onClick={handleUpdate}>update</button>


        
       </div>

    )

}