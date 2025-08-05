import { Cloudinary } from "cloudinary-core";

// const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = 'dktm5gmsg';
const uploadPreset = 'college_verse_postUpload';

if (!cloudName || !uploadPreset) {
  console.warn("Missing VITE_CLOUDINARY_* env vars");
}

const cl = new Cloudinary({ cloud_name: cloudName });
export async function uploadImageFrontend(file) {
  const url = `https://api.cloudinary.com/v1_1/dktm5gmsg/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", 'college_verse_postUpload');
  formData.append("cloud_name", 'dktm5gmsg');

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || "Cloudinary upload failed");
  }
  console.log("response of cloudinary",res);
  return await res.json();
}

export function urlFor(publicId, options = {}) {
  // options e.g. { width:300, crop:"fill" }
  return cl.url(publicId, options);
}
