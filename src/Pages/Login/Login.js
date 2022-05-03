import React from 'react'
import { useNavigate } from 'react-router';
import loginIcon from '../../images/userimg.jpg'
import img from '../../images/img.png'
import NavBar from '../../Components/NavBar/NavBar';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div className="flex justify-around">
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
            <form>
              <div className="mb-3" controlId="formBasicEmail">
                <input
                  className="h-10 formElement"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3" controlId="formBasicPassword">
                <input
                  className="h-10 formElement"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="grid gap-2">
                <button
                  className="h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm"
                  type="submit"
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