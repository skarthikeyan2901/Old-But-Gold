import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import NavBar from "../../Components/NavBar/NavBar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import user_img from "../../images/man.jpg";
import axios from "axios";
function Profile() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [things, setThings] = useState([]);
  const [issued, setIssued] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post("http://localhost:8080/item/profile", {
        token,
      })
      .then((res) => {
        setThings(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post("http://localhost:8080/item/getItem", {
        token,
      })
      .then((res) => {
        console.log("Response is", res);
        console.log(res.data);
        setIssued(res.data.data);
        console.log("Issue", issued);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8080/user/profile", {
        token,
      })
      .then((res) => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPhone(res.data.data.phone);
        setAddress(res.data.data.address);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center">
        <div className="bg-slate-100 w-1/2 h-1/2 mt-10 rounded-lg pb-6">
          <div className="flex items-center justify-center pt-10 flex-col">
            <img src={user_img} alt="" className="rounded-full w-32 " />
            <h1 className="text-gray-800 font-semibold text-xl mt-5">{name}</h1>
            <h1 className="text-gray-400 font-semibold text-xl mt-5">
              {email}
            </h1>
            <h1 className="text-gray-800 font-semibold text-xl mt-5">
              {phone}
            </h1>
            <h1 className="text-gray-800 font-semibold text-xl mt-5">
              {address}
            </h1>
            <div className="grid rows-2 grid-flow-col gap-2 flex-justify">
              <h1 className="text-gray-600 font-semibold text-xl mt-5">
                Items Donated:
              </h1>
              <div className="flex pt-6 gap-y-4 gap-x-2">
                {things.map((item) => {
                  return <span>{item.name}, </span>;
                })}
              </div>
            </div>
            <div className="grid rows-2 grid-flow-col gap-2 flex-justify">
              <h1 className="text-gray-600 font-semibold text-xl mt-5">
                Items Bought:
              </h1>
              <div className="flex pt-6 gap-y-4 gap-x-2">
                {issued.map((item) => {
                  return <span>{item.name}, </span>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
