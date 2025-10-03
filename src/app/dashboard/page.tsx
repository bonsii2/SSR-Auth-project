import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Card container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-6">
        <p className="text-gray-600">
          Welcome back, <span className="font-medium">{user?.email}</span>
        </p>

        {/* Links */}
        <nav className="flex flex-col space-y-3">
          <Link
            href="/registerOrganization"
            className="w-full text-center bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Register Organization
          </Link>

          <Link
            href="/ImageUploader"
            className="w-full text-center bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Upload Image
          </Link>
        </nav>

        {/* Logout form */}
        <form action="/api/auth/logout" method="post" className="pt-4 border-t">
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
