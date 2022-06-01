import React from "react";
import { useEffect, useState } from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import NavBar from "../../Components/NavBar/NavBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import axios from "axios";

function Feed() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);
  const arr = ["Hi","How are you"];

  useEffect(() => {
    axios
      .get("http://localhost:8080/item/getItems")
      .then((res) => {
        console.log(res.data.items);
        setItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [reload])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      let tempUser = jwt_decode(token);
      console.log(tempUser);
      if (!tempUser) {
        localStorage.removeItem("token");
        navigate("/");
      }
      else {
        setUser(tempUser);
        console.log("Hi",tempUser.emailin);
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="pb-10">
      <NavBar />
      <div className="flex justify-center pt-6">
        <SearchBar />
      </div>
      <div className="flex justify-center container mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-24 pt-6">
          {items.map((item) => {
            return <ItemCard item={item} user={user} reload={reload} setReload={setReload} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;
