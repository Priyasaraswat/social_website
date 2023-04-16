import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./chatOnline.css"

function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
    const [friends,setFriends]=useState([]);
    const [onlineFriends,setOnlineFriends]=useState([]);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>
    {
        const getFriends=async ()=>
        {
            const res=await axios.get("/api/users/friends/"+currentId);
            setFriends(res.data);
        }
        getFriends();
    },[currentId])
    //  console.log(onlineFriends);
    //  console.log(friends);

    useEffect(()=>
    {
        setOnlineFriends(friends.filter((f)=>onlineUsers?.includes(f?._id)))
    },[friends,onlineUsers])
    // console.log(onlineUsers);
    const handleClick = async (user)=>
    {
      try{
        const res= await axios.get(`/api/conversation/find/${currentId}/${user?._id}`);
        setCurrentChat(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
  return (
    <div className='chat-online'>
        {onlineFriends.map(o=>(
           <div className='chat-online-friend'onClick={()=>handleClick(o)}>
           <div className='chat-online-img-contanier'>
               <img src={o?.profilePhoto? PF+o?.profilePhoto:PF+"noAvatar.png"}alt="" className='chat-online-img' /> 
               <span className='chat-online-badge'></span>
           </div>
           <div className='chat-online-name'>{o?.username}</div>
       </div>
        ))}
        
       
    </div>
  )
}

export default ChatOnline