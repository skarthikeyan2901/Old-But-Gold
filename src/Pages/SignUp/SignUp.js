import React from 'react'
import { useNavigate } from 'react-router';
import loginIcon from '../../images/userimg.jpg'
import img from '../../images/img.png'
import NavBar from '../../Components/NavBar/NavBar';
import axios from "axios"
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
function SignUp() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setcPassword] = useState("");
  const [msg,setmsg] = useState("");
  const PostData = (e)=>{
    e.preventDefault();
    if(password!==cpassword){
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    else {
      
      axios
        .post("http://localhost:8080/user/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((data) => {
          console.log(data);
          if (data.data.status === "SUCCESS") {
            toast.success(data.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            toast.error(data.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="flex justify-around">
        <div className="text-center w-1/3">
          <div className="flex flex-col justify-center h-4/5">
            <div className='flex justify-center'>
              <img
                className="mb-2"
                src={loginIcon}
                alt="icon"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <form>
              <div className="mb-3" controlId="formBasicName">
                <input
                  className="h-10 formElement"
                  name='name'
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3" controlId="formBasicEmail">
                <input
                  className="h-10 formElement"
                  name='email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3" controlId="formBasicPassword">
                <input
                  className="h-10 formElement"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3" controlId="formBasicConfirmPassword">
                <input
                  className="h-10 formElement"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e)=>setcPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
              <div className="grid gap-2">
                <button
                  className="h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm"
                  type="submit" onClick={PostData}
                >
                  Sign Up
                </button>
                <div className="flex justify-center h-1 mt-4">
                  <span className="underline text-blue-700 text-sm cursor-pointer" onClick={() => {navigate("/login")}}>
                    Already have an account? Login
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

export default SignUp;