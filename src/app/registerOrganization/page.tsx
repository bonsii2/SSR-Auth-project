"use client";

import { useState } from "react";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setUploading] = useState(false);

  const handleInsert = async () => {
    try {
      if (!logo) {
        alert("Please select a logo file");
        return;
      }
      setUploading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("logo", logo);

      const res = await fetch("/api/RegisterOrganization", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("insert failed", json);
        alert(json.error || "insert failed");
        return;
      }

      console.log("insert:", json.data);
      setName("");
      setPhone("");
      setLocation("");
      setLogo(null);
      alert("Organization created!");
    } catch (err) {
      console.error("network error", err);
      alert("network error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Register Organization
        </h1>

        <input
          type="text"
          placeholder="Organization Name"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-600"
          onChange={(e) => setLogo(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleInsert}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition 
            ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Saving..." : "Add Organization"}
        </button>
      </div>
    </div>
  );
}
