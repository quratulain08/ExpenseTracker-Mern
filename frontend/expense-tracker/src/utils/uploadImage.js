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

export const uploadImageToCloudinary = async (file, type = 'expense') => {
  const formData = new FormData()
  formData.append('icon', file)

  try {
    const endpoint = type === 'expense' 
      ? API_PATHS.EXPENSE.UPLOAD_ICON 
      : API_PATHS.INCOME.UPLOAD_ICON

    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.imageUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error(error.response?.data?.message || 'Failed to upload image')
  }
}

export const uploadProfileImageToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.imageUrl
  } catch (error) {
    console.error('Error uploading profile image:', error)
    throw new Error(error.response?.data?.message || 'Failed to upload profile image')
  }
}
