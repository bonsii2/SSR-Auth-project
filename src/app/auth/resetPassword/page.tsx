'use client'
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Supabase automatically signs in the user via the magic link
    // So we can now update their password
  }, []);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else {
      setMessage("Password updated successfully!");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Reset Your Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2"
      >
        Update Password
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
