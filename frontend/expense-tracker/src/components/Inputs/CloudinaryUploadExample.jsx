import React, { useState } from 'react'
import { LuUpload, LuImage } from 'react-icons/lu'
import { uploadImageToCloudinary } from '../../utils/uploadImage'

const CloudinaryUploadExample = ({ type = 'expense', onImageUploaded }) => {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = React.useRef(null)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Reset error state
    setError('')
    setUploading(true)

    try {
      // Upload to Cloudinary via our backend
      const uploadedImageUrl = await uploadImageToCloudinary(file, type)
      
      setImageUrl(uploadedImageUrl)
      onImageUploaded?.(uploadedImageUrl)
      
      console.log('Image uploaded successfully:', uploadedImageUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      setError(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setImageUrl('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onImageUploaded?.('')
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        <LuImage className="inline mr-2" />
        Upload Icon to Cloudinary
      </label>
      
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
          disabled={uploading}
        />
        
        {!imageUrl ? (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full relative border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            <LuImage className="text-2xl text-gray-400" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LuUpload className="text-xs" />
              )}
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Uploaded icon"
              className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
            />
            <button
              type="button"
              onClick={removeImage}
              className="w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          {uploading ? 'Uploading to Cloudinary...' : 
           imageUrl ? 'Image uploaded successfully' : 
           'Click + to upload image'}
        </p>
        
        {error && (
          <p className="text-xs text-red-500 mt-1 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default CloudinaryUploadExample