import React from 'react'
import "./closefriend.css"
import {Link} from "react-router-dom"


function CloseFriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={"/profile/"+user.username}>
    <li className='leftbar-friend'>
                   <img src={user.profilePhoto? PF+user.profilePhoto :PF+"noAvatar.png"} alt="" className='leftbar-friend-img'></img>
                   <span className='leftbar-friend-text'>{user.username}</span>
               </li>
               </Link>
  )
}

export default CloseFriend