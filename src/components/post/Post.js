import React, { useState , useEffect, useContext } from 'react'
import "./post.css"
// import {DeleteForever, MoreVert } from "@material-ui/icons"
import { VscKebabVertical } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";
import {format} from "timeago.js"
 import axios from "axios"
 import {Link} from 'react-router-dom'
 import { AuthContext } from '../../context/AuthContext';

function Post({post}) {
  // useState ke andar default value hai
 const [like,setLike] =useState(post.likes.length);
 const [isLiked,setIsLiked]=useState(false);
 const PF=process.env.REACT_APP_PUBLIC_FOLDER;
 const [user,setUser] =useState({});
 const {user:currentUser} =useContext(AuthContext);
 const [isActive,setIsActive]=useState(false);

 useEffect(()=>{
     setIsLiked(post.likes.includes(currentUser._id))
 },[currentUser._id,post.likes]);
 
 useEffect(() => {
  const fetchUser = async () => {
   const res = await axios.get(`/api/users?userId=${post.userId}`);
     setUser(res.data);
  }; 
  fetchUser();
},[post.userId]);
// console.log(user);
 const likeHandler =()=>
 {
  try
  {
     axios.put("/api/posts/"+post._id+"/like",{userId:currentUser._id});
  }
  catch(err)
  {

  }
   setLike(isLiked ? like-1:like+1);
   setIsLiked(!isLiked);
 }
 const handleclick =()=>
 {
  if(isActive)
  {
    setIsActive(false);
  }
  else
  {
  setIsActive(true);
  }
  
 }
 const handledelete = ()=>
 {
  try{
   axios.delete("/api/posts/"+post._id);
   window.location.reload();
  }
  catch(err)
  {
    console.log(err);
  }

 }
 
  return (
    <div className='post'>
        <div className='post-top'>
            <div className='post-top-left'>
              <Link to={`/profile/${user.username}`}>
                
                <img  src={user.profilePhoto? PF+user.profilePhoto : PF+"noAvatar.png"} alt="" className='post-user-img'/>
                </Link>
                <span className='post-user-name'>{user.username}</span>
                <span className='post-time'>{format(post.createdAt)}.</span>
            </div>
            <div className='post-top-right'>
              {/* <div className='delete-post-icon active-icon'>Delete</div> */}
              <div className={isActive?'active-icon':'delete-post-icon'} onClick={handledelete}>
                <MdDeleteForever /> Delete the post</div>
              <VscKebabVertical className='share-icon'onClick={handleclick}/>
              
              
            </div>
        </div>
        <div className='post-center'>
        <span className='post-caption'>{post?.desc}</span>
        <img src={PF+post.img} alt="" className='post-img'/>
        
        </div>
        <div className='post-bottom'>
          <div className='post-bottom-left'>
          <img src={PF+"likes.png"} alt="" className='post-like' onClick={likeHandler} />
          <img src={PF+"heart.png"} alt="" className='post-heart' onClick={likeHandler}/>
          <span className='post-like-text'>{like} liked it</span>
          </div>
          
        </div>
    </div>
  )
}

export default Post