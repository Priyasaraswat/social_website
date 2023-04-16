import React, { useEffect, useState } from 'react'
import "./conversations.css"
import axios from "axios";
function Conversations({conversation ,currentUser}) {
  const [user,setUser]=useState(null);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>
  {
    const friendId=conversation.members.find((m)=>m !== currentUser._id);
    const getUser =async ()=>
    {
      try{
      const res=await axios.get("/api/users?userId="+friendId);
      setUser(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    getUser();
  },[currentUser,conversation])

  return (
    // question zaroori hai agar nhi hui toh
    <div className='conversations'>
        <img className='conversations-img'  src={user?.profilePhoto ? PF+user?.profilePhoto : PF+"noAvatar.png"} alt="" />
        <span className='conversations-name '>{user?.username}</span>
    </div>

  )
}

export default Conversations