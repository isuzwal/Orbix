import { toast } from "sonner";


export const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/upload-image`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
    
      return result.link;
    } else {
      throw new Error("Uplaoding Fail Please Try again");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    toast.error("Image upload failed!");
    return null;
  }
};
