import React, { useEffect, useRef, useContext, useState } from "react";
import "./updateuser.css";
import { useParams } from "react-router";
import Topbar from '../../components/topbar/Topbar'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
;

function UpdateUser() {
  const { user } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const birthdayDay = useRef();
  const birthdayMonth = useRef();
  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();

  const [profilepic,setProfilePic]=useState();
  const [coverpic,setCoverPic]=useState();
  
  let newuser
  const handlesubmit = async(e)=>{
    e.preventDefault();
     newuser = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      birthdayDay: birthdayDay.current.value,
      birthdayMonth: birthdayMonth.current.value,
      desc: desc.current.value,
      city: city.current.value,
      from: from.current.value,
      relationship: relationship.current.value,
     
    }
    username.current.value="";
    email.current.value="";
    password.current.value="";
    birthdayDay.current.value="";
    birthdayMonth.current.value="";
    desc.current.value="";
    city.current.value="";
    from.current.value="";
    relationship.current.value="";
    
    handleoncemore();
  }
  

  const  handleoncemore = async (e) => {
      //  e.preventDefault();
    
   
      const data=new FormData();
      const profilepicName= Date.now() + profilepic.name;
      data.append("name",profilepicName);
      data.append("file",profilepic);
      newuser.profilePhoto=profilepicName
      try{
       await axios.post("/api/upload",data);
       handleagain();
      }
     catch(err){
      console.log(err);
     }
     
  //    e.target.value = null;
  //  profilepic="";
  };
  const handleagain =async(e)=>
  {
    // e.preventDefault();
    const dataa=new FormData();
    const coverpicName= Date.now() + coverpic.name;
    dataa.append("name",coverpicName);
    dataa.append("file",coverpic);
    newuser.coverPhoto=coverpicName;
     try{
     await axios.post("/api/upload",dataa);
     handleagainagain();
     }
     catch(err)
     {
      console.log(err);
     }
    
    //  coverpic="";
     
  }
  
 const handleagainagain =async(e)=>
 {
  // e.preventDefault();
  try {
      
    await axios.put("/api/users/"+user._id, newuser);
      // console.log(user._id);
    
  } catch (err) {
    console.log(err);
  }
  newuser.following=user.following;
  newuser.followers=user.followers;
  newuser._id=user._id;
  localStorage.setItem("user", JSON.stringify(newuser));
 }  // localStorage.setItem("user",user);
  // localStorage.setItem("user", JSON.stringify(user))
  // console.log(user);
  return (
    <>
    <Topbar />
    <div className="update-user">
      <form onSubmit={handlesubmit} className="update-user-data">
        
        <h3 className="heading-update">Update Your Profile </h3>
        <div className="form-update-div">
        <input placeholder="Name" ref={username} required/>
        </div>
        <div className="form-update-div">
        <input placeholder="Email" type="email"  ref={email} required />
        </div>
        <div className="form-update-div">
        <input placeholder="Password" ref={password}  required/>
        </div>
        <div className="form-update-div pic-div">
        <span className="pic-text">Profile Pic</span>
        <input  type="file" id="profilepic" accept='.png,.jpg,.jpeg' onChange={(e)=>setProfilePic(e.target.files[0])}  required/>
        </div>
        <div className="form-update-div pic-div">
        <span className="pic-text">Cover Pic</span>
        
        <input type="file" id="coverpic" accept='.png,.jpg,.jpeg' onChange={(e)=>setCoverPic(e.target.files[0])} required />
        </div>
        
        <div className="form-update-div">
        <input type="number" placeholder="Birthday Date"ref={birthdayDay} required />
        </div>
        
        <div className="form-update-div ">
        <input type="number" placeholder="Birthday Month"ref={birthdayMonth} required/>
        </div><div className="form-update-div">
        <input placeholder="Description" type="text" ref={desc} required/>
        </div>
        <div className="form-update-div">
        <input placeholder="City" type="text" ref={city} required />
        </div>
        <div className="form-update-div">
        <input placeholder="From" type="text" ref={from} required />
        </div>
        <div className="form-update-div">
        <input placeholder="Relationship" type="text" ref={relationship} required />
       </div>
        <button type="submit" className="user-update-btn" >Submit</button>
      </form>
    </div>
    </>
  );
}

export default UpdateUser;
