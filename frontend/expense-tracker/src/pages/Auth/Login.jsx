import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const[error,_setError] = useState("");

  const _navigate = useNavigate();
//Handle Login Form Submit
const handleLogin = async(e) =>{
  e.preventDefault();

  if(!validateEmail(email)){
    _setError("Please enter a valid email");
    return;
  }
  if(!password){
    _setError("Please enter your password");
    return;
  }

  _setError("");

  //Login APi call
}



  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
       <h3 className='text-xl font-semibold text-black'> Welcome Back</h3>
       <p className='text-xs text-slate-700 mt-[5px] mb-6'>Login to your account</p>
      
      <form onSubmit={handleLogin}>
         <Input
        value = {email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email"
        placeholder="Enter your email"
        type="email"
        />


      <Input
        value = {password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Enter your password"
        type="password"
        />

        {error && <p className='text-red-500 text-sm my-2'>{error}</p>}
        <button type='submit' className='btn-primary'>Login</button>

  <p className='text-sm text-slate-700 mt-4'>Don't have an account? {""}
    <Link className='text-teal-600 font-medium' to="/signUp">SignUp</Link>

  </p>
      </form>

      </div>
    </AuthLayout>
  )
}

export default Login