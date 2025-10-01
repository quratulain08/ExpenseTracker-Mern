import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // 🔑 must match upload.single("image") in backend

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // returns { imageUrl }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
