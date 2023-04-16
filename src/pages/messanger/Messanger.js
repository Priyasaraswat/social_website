
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversations from '../../components/coversations/Conversations';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import "./messanger.css";
import axios from "axios";
import {io} from "socket.io-client";

function Messanger() {
  const [conversations,setConversations]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [newMessages,setnewMessages]=useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  // const [socket,setSocket]=useState(null);
  const scrollRef=useRef();
  const socket =useRef();

  const {user}= useContext(AuthContext);
   const ENDPOINT= process.env.PORT;

  useEffect(()=>
  {
    socket.current=io(ENDPOINT);
    socket.current.on("getMessage",data=>
    {
       setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()

       })
    })
  },[])
  useEffect(()=>
  {
      arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
      setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage,currentChat])
  // whenever socket changes

 useEffect(()=>
 {
  // client to server 
  socket.current.emit("addUser",user._id);
  socket.current.on("getUser",users=>
  {
     setOnlineUsers(user.following.filter((f) =>users.some((u)=>u?.userId ===f )));
    // setOnlineUsers(users);

    // console.log(users);
  })
 },[user])
  
 
  // useeffect will fetch all the message of this user
  useEffect(()=>
  {
    const getConversation =async()=>
    {
      try{
      const res= await axios.get("/api/conversation/"+user._id);
      setConversations(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    getConversation();
  },[user._id])
  
  //[user._id] is the dependencies
  useEffect(()=>
  {
    const getMessages = async ()=>
    {
      try{
      const res= await axios.get("/api/message/"+currentChat?._id);
      setMessages(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
    }
    getMessages();
  },[currentChat])
  const handleSubmit = async(e)=>
  {
   e.preventDefault();
   const message={
    sender:user._id,
    text:newMessages,
    conversationId:currentChat._id
   }

   const receiverId=currentChat.members.find(member =>member!==user._id);

   socket.current.emit("sendMessage",{
    senderId:user._id,
    receiverId,
    text:newMessages
  })

   try{
     const res =await axios.post("/api/message",message);
     setMessages([...messages,res.data]);
     setnewMessages("");
   }
   catch(err)
   {
    console.log(err);
   }
  }

  // whenever messages change fire this

  useEffect(()=>
  {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})

  },[messages])
  return (
    <>
    <Topbar />
    <div className='messanger'>
        <div className='chat-menu'>
            <div className='chat-menu-wrapper'>
                {/* <input placeholder='Search for your friends' className='chat-menu-input'/> */}
                <h4 className='messanger-heading'>Connect to people🤜🤛</h4>
                {conversations.map((conversation)=>
                (
                  <div onClick={()=>setCurrentChat(conversation)}>
                  <Conversations key={conversation._id} conversation={conversation} currentUser={user}/>
                  </div>
                ))}
               
               
            </div>
        </div>
        <div className='chat-box'>
        <div className='chat-box-wrapper'>
          { currentChat ?
          <>
            <div className='chat-box-top'>
              {messages.map((m)=>(
                <div ref={scrollRef}>
                <Message key={m._id} message={m}  own={m?.sender === user._id } />
                </div>
              ))}
            
            
            </div>
            <div className="chat-box-bottom"> 
            <textarea className='chat-box-bottom-msg' placeholder='write something...'
            onChange={(e)=>
            {
              setnewMessages(e.target.value);
            }}
            value={newMessages}
            ></textarea>
            <button className='chat-box-send' onClick={handleSubmit}>Send</button>
            </div>
            </> :<span className='chat-box-no-chat'>Open a conversation to start the chat 👀</span>}
        </div>
        </div>
        <div className='chat-online'>
        <div className='chat-online-wrapper'>
          <ChatOnline onlineUsers={onlineUsers} currentId={user?._id} setCurrentChat={setCurrentChat}/>
        </div>
        </div>
    </div>
    </>
  )
}

export default Messanger