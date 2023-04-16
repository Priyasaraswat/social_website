import React, { useContext, useRef, useState } from 'react'
import "./Share.css"
// import {PermMedia ,Label,Room,EmojiEmotions} from "@material-ui/icons"
import { MdPermMedia ,MdEmojiEmotions,MdLabel,MdLocationOn ,MdClear} from "react-icons/md";
import {AuthContext} from "../../../src/context/AuthContext";
import axios from "axios"
// import {Cancel} from "@material-ui/icons"

function Share() {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} =useContext(AuthContext);
  const desc=useRef();
  const [file,setFile]=useState(null);
  const submitHandler = async (e)=>
  {
     e.preventDefault();
     const newPost= {
      userId:user._id,
      desc:desc.current.value
     }
     if(file)
     {
      const data=new FormData();
      const fileName= Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img=fileName;
      try{
       await axios.post("/api/upload",data);
      }
      catch(err)
      {
        console.log(err);
      }
     }
     try{
         await axios.post("/api/posts",newPost);
         window.location.reload();
     }
      catch(err)
      {
      console.log(err);
      }
     
  }

  return (
    <div className='share'>
        <div className='shareTop'> 
         <img  src={user.profilePhoto? PF+user.profilePhoto : PF+"noAvatar.png"} alt="" className='shareimg'/>
         <input placeholder={"What's in your mind "+ user.username +"?"}
         ref={desc} 
         className='share-input'/>
        </div>
        <hr className='shareHr'/>
        {file && (
          <div className='share-img-container'>
            <img  className =" share-img-file" src={URL.createObjectURL(file)} alt="" />
            <MdClear  className="share-cancel-img-btn" onClick={()=>
            setFile(null)}
            />
          </div>
        )}
        <form className='share-bottom' onSubmit={submitHandler}>
          <div className='share-options'>
          <label  htmlFor="file" className='share-option'>
            <MdPermMedia  className="shareIcon mediaicon"  />
            <span className='shareIconOptionText'>Photo or Video</span>
            <input style={{display:"none"}} type="file" id="file" accept='.png,.jpg,.jpeg' onChange={(e)=>setFile(e.target.files[0])} />
          </label>
          <div className='share-option'>
            <MdLabel className="shareIcon labelicon" />
            <span className='shareIconOptionText'>Tag</span>
          </div>
          <div className='share-option'>
            <MdLocationOn className="shareIcon locationicon"   />
            <span className='shareIconOptionText'>Location</span>
          </div>
          <div className='share-option'>
            <MdEmojiEmotions className="shareIcon emojiicon"  />
            <span className='shareIconOptionText'>Feelings</span>
          </div>
          <button className='share-button' type="submit">Share</button>
       </div>
        </form>
    </div>
  )
}

export default Share