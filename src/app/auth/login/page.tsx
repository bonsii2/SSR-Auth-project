"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/hooks/useSupabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirectedFrom = searchParams.get("redirectedFrom");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    console.log("Login Page - Error:", error);
    console.log("Login Page - Redirected from:", redirectedFrom);
  }, [error, redirectedFrom]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Attempting login with:", { email, password: "***" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), // Normalize email
        password,
      });

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Login error details:", {
          message: error.message,
          name: error.name,
          status: error.status,
        });
        setFormError(error.message);
        return;
      }

      if (data.user) {
        console.log("Login successful! User:", data.user.email);
        console.log("Session:", data.session);

        router.refresh();
        const redirectTo = redirectedFrom || "/dashboard";
        setTimeout(() => {
          router.push(redirectTo);
        }, 100);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) console.log("Google login error", error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Login
      </h2>

      {redirectedFrom && (
        <div className="text-orange-600 mb-4 text-sm">
          Please log in to access{" "}
          <span className="font-medium">{redirectedFrom}</span>
        </div>
      )}

      {(error || formError) && (
        <div className="text-red-600 mb-4 text-sm">
          <strong>Error:</strong> {formError || error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <Link
          href={"/auth/forgetPassword"}
          className="text-blue-600 text-sm text-center"
        >
          Forgot password?
        </Link>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
