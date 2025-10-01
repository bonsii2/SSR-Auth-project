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
    <div>
      {redirectedFrom && (
        <div style={{ color: "orange", marginBottom: "1rem" }}>
          Please log in to access {redirectedFrom}
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>
      )}

      <form action="/api/auth/login" method="post">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
