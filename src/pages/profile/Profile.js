import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Topbar from '../../components/topbar/Topbar'

import Centerbar from '../../components/centerbar/Centerbar'
import Rightbar from '../../components/rightbar/Rightbar'
import {useParams} from "react-router"




function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] =useState({});
  const username =useParams().username;
  

  useEffect(() => {
    const fetchUser = async () => {
     const res = await axios.get(`/api/users?username=${username}`);
       setUser(res.data);
    };
    fetchUser();
  },[username]);
  return (
    <>
    <Topbar />
    <div className='profile'>
      {/* <Leftbar /> */}
      <div className='profile-right'>
      <div className='profile-right-top'>

        <div className='profile-cover'>
        <img src={user.coverPhoto?PF+user.coverPhoto: PF+"noPost.png"} alt="" className='profile-background-img' />
     
        <img src={user.profilePhoto? PF+user.profilePhoto: PF+"noAvatar.png"}alt="" className='profile-dp-img' />
       
        </div>
        <div className='profile-info'>
          <h3 className='profile-info-heading'>{user.username}</h3>
          <span className='profile-info-salutation'>{user.desc}</span>
        </div>
      </div>
      <div className='profile-right-bottom'>
      
      <Centerbar username={username}/>
      <Rightbar user={user} />
      </div>
      
      </div>
      </div>
      </>
  )
}

export default Profile