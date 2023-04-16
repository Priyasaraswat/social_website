import React ,{useContext, useRef} from 'react'
import "./login.css"
import {loginCall} from "../../../src/apiCalls"
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineReload} from "react-icons/ai";
import {Link} from 'react-router-dom'

function Login() {
  const email=useRef();
  const password=useRef();
  const {user , isFetching,error,dispatch} = useContext(AuthContext); 

  const handleClick =(e) =>
  {
   e.preventDefault();
   
      loginCall({email:email.current.value,password:password.current.value},dispatch);
     
       
     
  
  }
  //  console.log(user);
  return (
    <div className='login'>
        <div className='login-top'>
        <h2 className='login-title'>Social Beings 🙂</h2>
        <span className="login-desc">Connect to your beloved friends and colleagues on Social Beings</span>
        </div>
        <div className='login-bottom' onSubmit={handleClick}>
            <form className='login-box'>
                <input placeholder='Email' type="email" 
                required 
                className="input-data" 
                ref={email}
                />
                <input placeholder='Password' type="password" className="input-data"
                minLength="4"
                required
                ref={password} />
                <button className='login-btn' type="submit" 
                disabled={isFetching}
                >{isFetching ? <AiOutlineReload color="inherit" size="1.2rem"/> : "Log In" }</button>
            </form>
            <div className='login-bottom-bottom'>
            <span className='login-forgot-pass'>Forgot Password?</span>
            <Link to="/register">
            <button className='login-register-btn'>
            Create a New Account </button>
            </Link>
            </div>
        </div>

    </div>
  )
}

export default Login