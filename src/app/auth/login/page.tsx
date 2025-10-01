"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirectedFrom = searchParams.get("redirectedFrom");

  useEffect(() => {
    console.log("Login Page - Error:", error);
    console.log("Login Page - Redirected from:", redirectedFrom);
  }, [error, redirectedFrom]);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

      {redirectedFrom && (
        <div className="text-orange-600 mb-4 text-sm">
          Please log in to access <span className="font-medium">{redirectedFrom}</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 mb-4 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form action="/api/auth/login" method="post" className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
