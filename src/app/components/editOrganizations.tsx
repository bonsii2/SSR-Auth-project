'use client'
import { useEffect, useState } from "react"
import { supabase } from "../hooks/useSupabase"

export default function EditProfile({orgId}: {orgId: string}){
 const [name, setName] = useState('')
 const [Phone, setPhone] = useState('')
 const [location, setLocation] = useState('')
//  const [logo, SetLogo] = useState('')
 
useEffect(() =>{
   const fetchOrganization = async () => {
      const {data, error} = await supabase
      .from('organization')
      .select('name, location, phone')
      .eq('id', orgId)
      .single()

      if(data){
        setName(data.name);
        setLocation(data.location);
        setPhone(data.phone);
      }
   };
    fetchOrganization();
}, [orgId])

const handleUpdate = async () =>{
    const {error} = await supabase
    .from('organization')
    .update({name, Phone, location})

    if(error){
        console.log('update faield' + error.message)
    }else{
        console.log('updated seccussfully');
    }

}

    return(
       <div className="flex flex-col gap-1">
   <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
   <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
   <input type="tel" name="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
   {/* <input type="file" name="logo" value={logo} onChange={(e) => SetLogo(e.target.value)} /> */}

 <button onClick={handleUpdate}>update</button>


        
       </div>

    )

}