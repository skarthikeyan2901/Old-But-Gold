import React from "react";
import {useEffect} from "react"
import ItemCard from "../../Components/ItemCard/ItemCard";
import NavBar from "../../Components/NavBar/NavBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router'

function Feed() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
          const user = jwt_decode(token)
          console.log(user)
          if(!user){
            localStorage.removeItem('token')
            navigate("/");
          }
        }
        else{
          navigate("/")
        }
      },[])
    return (
    <div>
        <NavBar />
        <div className="flex justify-center pt-6">
            <SearchBar />
        </div>
        <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 p-6">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            </div>
        </div>
    </div>
    );
}

export default Feed;