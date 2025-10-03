import React, { useState } from 'react'
import { supabase } from '@/lib/supabase';

export default  async function page()

{
    
const [phone, setPhone] = useState('');
const [name, setName] = useState('');
const [location, setLocation] = useState('');

const  handleInsert = async () =>{
 const res = await fetch('/api/RegisterOrganization', {
    method: "POST",
    headers: {"content-Type": "application/json"},
    body: JSON.stringify({name, phone, location})
 })


}

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="phone"
        className="border p-2 mr-2"
        value={phone} 
        name='phone'
        onChange={(e) => setPhone(e.target.value)}
      />
      <input type="text" placeholder='enter your location' name='location' value={location} onChange={(e) => setLocation(e.target.value)} />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleInsert}
      >
        Add User
      </button>
    </div>
  );
}

