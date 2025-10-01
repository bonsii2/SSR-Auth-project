// pages/forgot-password.tsx
'use client'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    console.log("Running in browser?", typeof window !== "undefined");
  const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/auth/resetPassword", // Change to your deployed URL
    });
    if (error) setMessage(error.message);
    else setMessage("Password reset email sent!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
