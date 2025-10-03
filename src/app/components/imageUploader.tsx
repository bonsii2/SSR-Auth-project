import { useState } from "react";
import { supabase } from "@/app/hooks/useSupabase";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("image") // your bucket name
      .upload(fileName, file);

    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from("image")
        .getPublicUrl(fileName);

      setImageUrl(urlData.publicUrl);
    }

    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-64 h-auto rounded" />
      )}
    </div>
  );
}
