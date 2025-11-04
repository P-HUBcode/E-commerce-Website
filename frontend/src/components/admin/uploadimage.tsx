import React, { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImageUrl(res.data.url);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFile} />
      {uploading && <p>Đang tải lên...</p>}
      {imageUrl && (
        <div>
          <p>Ảnh đã upload:</p>
          <img src={imageUrl} alt="uploaded" className="w-40 rounded-xl" />
        </div>
      )}
    </div>
  );
}
