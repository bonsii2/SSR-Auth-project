'use client'

import { useState } from 'react'

export default   function page()

{
    
const [phone, setPhone] = useState('');
const [name, setName] = useState('');
const [location, setLocation] = useState('');

const  handleInsert = async () =>{
  try{
 const res = await fetch('/api/RegisterOrganization', {
    method: "POST",
    headers: {"content-Type": "application/json"},
    body: JSON.stringify({name, phone, location})
 })
 const json = await res.json();
 if(!res.ok){
  console.error("insert failed", json);
  alert(json.error || 'insert failed');
  return;
 }
console.log('insert:', json.data);

setName("");
setPhone("");
setLocation("");
alert("Organization created!");
  }catch(err){
    console.error('network error', err);
    alert("network error");

  }

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

