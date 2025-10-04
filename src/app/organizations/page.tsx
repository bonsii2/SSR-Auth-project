'use client'
import { FetchOrganization } from "../hooks/fetchOrganization";
import { useEffect, useState } from "react";

type organization = {
    id: string;
    name: string;
    phone: string;
    location: string;
    logo: string;
};
export  default function organization(){

    const [organizations, setOrganizations]= useState<organization[]>([]);
useEffect(() =>{
    async function loadData() {
  const orgs = await FetchOrganization();
  setOrganizations(orgs);
         }
         loadData();
}, []);

return (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Organizations</h2>
    <ul className="space-y-4">
      {organizations.map((org) => (
        <li key={org.id} className="border p-4 rounded">
          <h3 className="text-lg font-semibold">{org.name}</h3>
          <p>📞 {org.phone}</p>
          <p>📍 {org.location}</p>
          {org.logo && (
            <img
              src={org.logo}
              alt={`${org.name} logo`}
              className="w-32 mt-2"
            />
          )}
        </li>
      ))}
    </ul>
  </div>
);

}