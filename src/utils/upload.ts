import axios from "axios";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export async function uploadToCloudinary(
  file: File,
  animeTitle: string,
  fileType?: 'image' | 'video' | 'subtitle'
): Promise<{ url: string; publicId: string } | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "MUGISUB");

  if (animeTitle) {
    const formattedFolder = animeTitle
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();

    const folderPath = fileType 
      ? `admin_upload/${formattedFolder}/${fileType}` 
      : `admin_upload/${formattedFolder}`;

    formData.append("folder", folderPath);
  }

  try {
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL || process.env.CLOUDINARY_URL;
    if (!url) {
      console.error("Cloudinary URL is missing in environment variables.");
      return null;
    }

    const response = await axios.post<CloudinaryResponse>(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      url: response.data.secure_url,
      publicId: response.data.public_id
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cloudinary Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    return null;
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const response = await axios.post('/api/admin/cloudinary/delete', { public_id: publicId });
    return response.data?.success || true;
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    return false;
  }
}