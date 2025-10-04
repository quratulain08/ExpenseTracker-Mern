import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

import axiosInstance from "../../utils/axiosInstance";
import { uploadProfileImageToCloudinary } from "../../utils/uploadImage";
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("SignUp form submitted");
    // let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");
    console.log("Validation passed, making API call...");
    // 👉 TODO: Call your SignUp API here
  try{ 
    let profileImageUrl = "";
if (profilePic) {
  console.log("Uploading profile image to Cloudinary...");
  try {
    profileImageUrl = await uploadProfileImageToCloudinary(profilePic);
    console.log("Image uploaded successfully:", profileImageUrl);
  } catch (imageError) {
    console.error("Image upload failed:", imageError);
    setError("Failed to upload profile image. Please try again.");
    return;
  }
}



    const response = await axiosInstance.post(API_PATHS.Auth.REGISTER,{

      fullName,

      email,
      password,
      profileImageUrl

  });
  const{token, user } =response.data;

 if (token) {
  localStorage.setItem("accessToken", token); // ✅ match axiosInstance
  updateUser(user);
  navigate("/dashboard");

  }}catch(err){
    console.error("Signup error:", err);
    console.log("Error response:", err.response);
    console.log("Error data:", err.response?.data);
    console.log("Error status:", err.response?.status);
    console.log("Error config:", err.config);
    
    if(err.response && err.response.data && err.response.data.message){
      setError(err.response.data.message);
    } else if (err.response) {
      setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      setError("Network error: Unable to connect to server. Please check if the backend is running.");
    } else {
      setError(`Error: ${err.message}`);
    }
  }


  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        {/* Example form (you can style more) */}
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Enter your full name"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
