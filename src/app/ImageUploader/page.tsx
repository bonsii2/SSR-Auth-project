'use client'
import ImageUploader from "@/app/components/imageUploader";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Image to Supabase</h1>
      <ImageUploader />
    </main>
  );
}
