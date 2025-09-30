import React, { useState } from "react";
import { Link, _useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, _setError] = useState("");
  // const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // let profileImageUrl = "";

    if (!fullName) {
      _setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      _setError("Please enter a valid email");
      return;
    }
    if (!password) {
      _setError("Please enter your password");
      return;
    }
    _setError("");
    // 👉 TODO: Call your SignUp API here
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
