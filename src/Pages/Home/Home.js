import React from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'

function Home() {

    const navigate = useNavigate();

    return (
      <div className="bg-img">
        <NavBar />
        <div className="h-4/5 flex justify-center items-center backdrop-blur-sm">
          <div className="flex-col">
            <div className="bg-purple-100 bg-opacity-40 pb-1 px-4 rounded-2xl">
              <div className="uppercase text-8xl">Old But Gold</div>
              <div className="text-2xl text-center mt-4">
                A one-stop destination for all used student items
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                className="p-3 text-gray-50 text-lg bg-purple-500 rounded-xl hover:bg-purple-300 hover:text-black"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Start Using
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;