"use client";
import { useEffect, useState } from "react";
import { supabase } from "../hooks/useSupabase";

export default function EditProfile({ orgId }: { orgId: string }) {
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [Logo, SetLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from("organization")
        .select("*")
        .eq("id", orgId)
        .single();

      if (data) {
        setName(data.name);
        setLocation(data.location);
        setPhone(data.phone);
        SetLogo(data.logo);
        setLogoUrl(data.logo);
      }
    };
    fetchOrganization();
  }, [orgId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    let finalUrl = logoUrl;

    if (Logo) {
      const fileExt = Logo.name.split(".").pop();
      const fileName = `${Date.now()}_${fileExt}`;
      const { data, error } = await supabase.storage
        .from("logos")
        .upload(fileName, Logo);

      if (!error) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("logos").getPublicUrl(fileName);

        finalUrl = publicUrl;
      }
    }

    const { error } = await supabase
      .from("organization")
      .update({ name, phone: Phone, location, logo: finalUrl })
      .eq("id", orgId);

    if (error) {
      console.log("update failed" + error.message);
      alert("Update failed. Please try again.");
    } else {
      alert("Updated successfully!");
      console.log("updated successfully");
    }

    setIsLoading(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    SetLogo(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Organization Profile
      </h2>

      <div className="space-y-6">
        {/* Organization Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Organization logo"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                <span className="text-gray-500 text-sm">No Logo</span>
              </div>
            )}
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              Change Logo
            </span>
          </label>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Organization Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter organization name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter phone number"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location *
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
