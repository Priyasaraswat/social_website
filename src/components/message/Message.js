import React from 'react';
import "./message.css";
import {format} from "timeago.js"

function Message({message ,own}) {
  return (
    <div className={ own? 'message own' :'message '}>
        <div className='message-top'>
            <img src="https://images.pexels.com/photos/38289/portrait-photography-profile-face-one-38289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='message-top-img'></img>
            <p className='message-top-img-text'>{message?.text}
            </p>
        </div>
        <div className='message-bottom'>{format(message?.createdAt)}</div>
        </div>
  )
}

export default Message