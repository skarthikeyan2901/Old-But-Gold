import React, { useEffect, useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import NavBar from '../../Components/NavBar/NavBar'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router'
import axios from 'axios'
function Profile() {
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
      <SearchBar/>
    </div>
    
  )
}



export default Profile
