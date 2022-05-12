import React from 'react'

import { useNavigate } from 'react-router';
import loginIcon from '../../images/userimg.jpg'
import img from '../../images/img.png'
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import { useState } from 'react';
import {ToastContainer,toast} from "react-toastify"

function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const PostData = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/user/signin",{email:email,password:password}).then((data)=>{
      if(data.data.status === 'SUCCESS') {
        localStorage.setItem('token',data.data.user)
        navigate("/profile");
      }
      else{
        toast.error(data.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

      }
      console.log(data)
    }).catch(err=>console.log(err))

  }
  return (
    <div>
      <NavBar />
      
      <div className="flex justify-around">
        <ToastContainer />
        <div className="text-center w-1/3">
          <div className='flex flex-col justify-center h-3/4'>
            <div className='flex justify-center'>
              <img
                className="mb-2"
                src={loginIcon}
                alt="icon"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <form method='POST' id="form1">
              <div className="mb-3" controlId="formBasicEmail">
                <input 
                  onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  value={email}
                  name='email'
                  className="h-10 formElement"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-3" controlId="formBasicPassword">
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  value={password}
                  name='password'
                  className="h-10 formElement"
                  type="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <button
                  className="h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm"
                  type="submit" onClick={PostData}
                >
                  Login
                </button>
                <div className="flex justify-center h-1 mt-4">
                  <span className="underline text-blue-700 text-sm cursor-pointer" onClick={() => { navigate('/signup') }}>
                    Don't have an account? Signup
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img style={{ height: "93vh" }} src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;