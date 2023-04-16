import React ,{useContext, useRef} from 'react'
import "./register.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Link} from 'react-router-dom'



function Register() {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const reEnterPassword=useRef();
  const navigate = useNavigate();
  

  const handleClick = async(e) =>
  {
   e.preventDefault();
   if(password.current.value!=reEnterPassword.current.value)
   {
    password.current.setCustomValidity("Passwords don't match");
   }
   else
   {
    const user ={
      username:username.current.value,
      email:email.current.value,
      password:password.current.value
    }
    try{
      
    await axios.post("/api/auth/register",user);
    navigate("/login");
    }
    catch(err)
    {
      // res.status(200).json(err);
      console.log(err);
    }
   }
   
  }
  return (
    <div className='login'>
        <div className='login-top'>
        <h2 className='login-title'>Social Beings</h2>
        <span className="login-desc">Connect to your beloved friends and colleagues on Social Beings</span>
        </div>
        <div className='login-bottom'>
            <form className='login-box' onSubmit={handleClick}>
            <input placeholder='Username' required  type="text" ref={username} className="input-data" />
                <input placeholder='Email' required type="email" ref ={email} className="input-data" />
                <input placeholder='Password' required type="password" minLength ="4" ref={password} className="input-data" />
                <input placeholder='Re-Enter Password'  required type="password"  minLength ="4"ref={reEnterPassword} className="input-data" />
                <button className='login-btn' type="submit">Sign Up</button>
            </form>
            <div className='login-bottom-bottom'>
              <Link to="/login">
            <button className='login-register-btn'>Log into your Account</button>
            </Link>
            </div>
        </div>

    </div>
  )
}

export default Register