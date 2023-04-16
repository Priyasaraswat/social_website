import React ,{Suspense,lazy, useState, useEffect,useContext} from 'react'
import "./showalluser.css"
import axios from "axios";
import Topbar from '../../components/topbar/Topbar';

import { AuthContext } from "../../context/AuthContext";

import { Link } from 'react-router-dom';




function ShowAllUser() {
  const [allUser,setAllUser]=useState([]);
   const {user}= useContext(AuthContext);
   const PF=process.env.REACT_APP_PUBLIC_FOLDER;
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
   },[user]);
   
   
   
   
  
   
  
  return (
    <>
    <Topbar />
    <div className='showAllUser'>
        
        
        <table className='show-users-table'>
        <tbody>
            <tr className="show-table-heading">
                <th>Profile</th>
                <th>Name</th>
                <th>From</th>
                <th>Followers</th>
                <th>Followings</th>
                
                </tr>
          {/* <Suspense fallback = {<div>Loading...</div>}>
          */}
              {allUser.map((allusers)=>(
               
               <tr className='show-user-data-table'>
               
                 <Link to={"/profile/"+allusers.username}>
               <td><img src={allusers.profilePhoto? PF+allusers.profilePhoto :PF+"noAvatar.png"} alt="" className='show-users-img'></img>
             </td>
             </Link>
             <td className='show-users-name'>{allusers.username}</td>
             <td className='show-users-name'>{allusers.from}</td>
             <td className='show-users-name'>{allusers.followers.length}</td>
             <td className='show-users-name'>{allusers.following.length}</td>
            
              </tr>
              ))}
              </tbody>
              {/* </Suspense> */}
              </table>
             
             
              
    </div>
    </>
  )
}

export default ShowAllUser