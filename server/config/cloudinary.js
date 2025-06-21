import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

// Function to upload a file to Cloudinary
export const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: options.folder || 'Uploads',
      resource_type: 'image',
      ...options,
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    throw err;
  }
};

// Function to generate image URL with optional transformations
export const getImageUrl = (publicId, transformations = []) => {
  return cloudinary.url(publicId, {
    transformation: transformations,
  });
};