import React ,{Suspense,lazy, useState, useEffect,useContext} from 'react'
import "./Rightbar.css"
import axios from "axios";
import {Link} from "react-router-dom"
// import {GroupAdd } from "@material-ui/icons";
// import { Remove } from '@material-ui/icons';
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineUserDelete} from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import Birthday from '../birthday/Birthday';
import { Memes } from '../../dummydata';
import Meme from '../meme/Meme';





 function Rightbar({user}) {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends]= useState([]);
  const {user:currentUser,dispatch}=useContext(AuthContext);
  const abc=currentUser.following.includes(user?._id);
  let [followed,setFollowed]=useState(abc);
  
   if(currentUser.following.includes(user?._id))
   {
     followed=true;
   }
 
  const [allUser,setAllUser]=useState([]);
  const {users}= useContext(AuthContext);
  useEffect(()=>
  {
     const getalluser= async()=>
     {
           try
           {
            const res= await axios.get("/api/users/getAllUser");
            setAllUser(res.data);
           
           }
           catch(err)
           {
             console.log(err);
           }
     }
     getalluser();
  },[users]);

    useEffect(()=>
   {
     const getFriends = async ()=>{
     try{
       const friendList = await axios.get(`/api/users/friends/${user._id}`);
    setFriends(friendList.data);
    }
    catch(err)
     {
    //  console.log(err);
    }
    }
   getFriends();
   },[user]);

  const handleClick =async ()=>{
    // console.log(followed);
    if(currentUser.following.includes(user?._id))
    {
      followed=true;
    }
    else
    {
      followed=false;
    }
   try{
     if(followed)
     {

     
       await axios.put(`/api/users/${user._id}/unfollow`,{userId:currentUser._id});
      
       //console.log(fall);
      //  console.log(followed);
      dispatch({type: "UNFOLLOW",payload:user._id})
     }
     else
     {
      const fall=await axios.put(`/api/users/${user._id}/follow`,{userId:currentUser._id});
      // console.log(fall);
      // console.log(followed);
      dispatch({type:"FOLLOW",payload:user._id})
     }
     setFollowed(!followed);
    //  console.log(followed);
   }
  
   catch(err)
   {
    console.log(err);
    // console.log(followed);
   }
  
  }
  // console.log(user);
const HomeRightbar =()=>

{
  let count=null;
  const handleBirthday =(allusers)=>
   {
    let monint =new Date().getMonth()+1;
    let mon= monint.toString();
    // console.log(mon===allUser[0]?.birthdayMonth);
    let dayint=new Date().getDate();
    // console.log(dayint)
    let day=dayint.toString();
    // console.log(day)
     if(day===allusers?.birthdayDay&&mon===allusers?.birthdayMonth)
     {
      count=1;
      return true;
     }
   }
    
  
  const MemeData=Memes[0].data;
  
  return (
    <div className="for-scroll">
    <div className='home-rightbar-none'>
   <div className='birthday-container'>
        <img src={PF+"gift.png"} alt="" className='birthday-img'/>
        
         {allUser.map((allusers)=>(
                  [
                   handleBirthday(allusers)?
                   <Birthday  birthdayUser={allusers} value={true} key={allusers._id} />:<Birthday  birthdayUser={allusers}  key={allusers._id} value={false} />
                  ]
                ))}
               {!count&&<div className='no-birthday'>No one has birthday today</div>}
                
      </div>
        <h4 className='meme-heading'>Just Laugh</h4>
      
           {MemeData.map((meme)=>(
            <Meme key={meme.ID} meme={meme}/>
          
         )          )}
          
     </div>
      </div>
  )
}

const ProfileRightbar =()=>
{
  return (
    <>
    {user.username !== currentUser.username && (
       <button className="rightbar-follow-btn" type="submit" onClick={handleClick}>
        {followed? "Unfollow" :"Follow"}
        {followed?<AiOutlineUserDelete />:<AiOutlineUserAdd />}
       
         </button>
        
       
    )}
     <h2 className='rightbar-user-title'>User Information</h2>
     <ul className='rightbarInfo'>
       <li className='rightbar-info-item'>
         <span className='rightbar-info-key'>City :</span>
         <span className='rightbar-info-value'>{user.city}</span>
       </li>
       <li className='rightbar-info-item'>
         <span className='rightbar-info-key'>From:</span>
         <span className='rightbar-info-value'>{user.from}</span>
       </li>
       <li className='rightbar-info-item'>
         <span className='rightbar-info-key'>Relationship :</span>
         <span className='rightbar-info-value'>{user.relationship}</span>
       </li>
     </ul>
     <h4 className='rightbar-friends-following'>User Friends</h4>
     <ul className='rightbar-followings'>
      {friends.map((friend)=>(
        <Link to={"/profile/"+friend.username}>
 <li className='rightbar-following-friend'>
  
 <img src={ friend.profilePhoto ? PF+friend.profilePhoto : PF+"noAvatar.png"} className="rightbar-following-friend-img" alt=""/>

 <span className="rightbar-following-friend-text">{friend.username}</span>
</li>
</Link>
      ))}
       
       
     </ul>
    </>
  )
}

return (
  <div className='rightbar phone-rightbar'>
   
   {user ? <ProfileRightbar /> :<HomeRightbar />}
  </div>
)

}

export default Rightbar