import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useState,useEffect } from "react";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router'

function ListItem() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [itemType,setItemType] = useState("");
  const [days,setDays] = useState("");
  const [images, setImages] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    console.log(token);
    if (token) {
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      }
      else {
        setCurrentUser(user.email);
        console.log(user.email)
      }
    } else {
      navigate("/");
    }
  }, []);

  const PostData = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemType', itemType);
    formData.append('days', days);
    formData.append('currentUser', currentUser);
    formData.append('images', images);

    axios
      .post("http://localhost:8080/item/list", formData)
      .then((data) => {
        if (data.data.status === "SUCCESS") {
          console.log("hi");
          console.log(data);

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
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const imageSelected = (img) => {
    console.log(img);
    setImages(img);
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
              required="true"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter type of item"
              name="itemType"
              required="true"
              onChange={(e) => setItemType(e.target.value)}
              value={itemType}
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter days used"
              name="days"
              required="true"
              onChange={(e) => setDays(e.target.value)}
              value={days}
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                imageSelected(e.target.files[0]);
              }}
              required="true"
              // multiple="true"
              className="mt-4"
            />
            <div className="mt-4 flex justify-center">
              <button
                className="w-72 h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm"
                onClick={PostData}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ListItem;