"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8002/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Uploaded!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Document</h1>
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Button onClick={handleUpload} className="mt-4">Upload</Button>
    </div>
  );
}
