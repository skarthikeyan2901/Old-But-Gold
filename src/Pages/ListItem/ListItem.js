import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useState } from "react";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'

function ListItem() {
  const [name,setName] = useState("");
  const [typee,setTypee] = useState("");
  const [days,setDays] = useState("");
  const PostData = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/item/list",{name:name,typee:typee,days:days}).then((data)=>{
      if(data.data.status === 'SUCCESS') {
        console.log('hi')
        console.log(data);
        
        toast.success(data.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
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
        <ToastContainer />
        <div className="text-5xl flex justify-center py-5 ">List an Item</div>
        <div className="flex justify-center">
          <form>
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter name of item"
              name="name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter type of item"
              name="typee"
              onChange={(e)=>setTypee(e.target.value)}
              value={typee}
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter days used"
              name="days"
              onChange={(e)=>setDays(e.target.value)}
              value={days}
            />
            <input type="file" className="mt-4" />
            <div className="mt-4 flex justify-center">
              <button className="w-72 h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm"
              onClick={PostData}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ListItem;