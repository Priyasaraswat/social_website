import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
// import {Chat , ExitToAppOutlined, PeopleAltOutlined, UpdateOutlined, HomeOutlined, CastConnectedOutlined, Close} from "@material-ui/icons";
import {MdChat,MdLogout,MdSupervisorAccount,MdUpdate,MdHome,MdClear,MdConnectWithoutContact ,MdMenu} from "react-icons/md";
import "./Topbar.css"
import {AuthContext} from "../../../src/context/AuthContext";
import {logoutCall} from "../../apiCalls";
import axios from 'axios';
// import { Menu } from "@material-ui/icons"
function Topbar() {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  const { user,dispatch} = useContext(AuthContext);
 
  const [ismenu,setIsMenu]=useState(false);
//  console.log(`${user.username}`);
const handleclick=()=>
{
 logoutCall(dispatch);
}
const handledelete =async()=>
{
  try{
    await axios.delete("/api/users/"+user._id);
    console.log("deleted");
  }
  catch(err)
  {
    console.log(err);
  }
  
}
const handleMenu =()=>
{
  setIsMenu(!ismenu);
}
  return (
    <div className='topbar'>
    <div className='topbar-left'>
      <Link to="/">
        <div className='topbar-logo-div'>
       <MdConnectWithoutContact className='topbar-logo-icon' />
        <span className='topbar-logo'>SOciAL BEinGS</span>
        </div>
        </Link>
    </div>
    <div className='topbar-right'>
      <div className={ismenu?"topbarLinks":"topbarLinksmenu"}>
        <Link to="/">
          <div className='topbar-menu-icon '>

        <span className='topbarLink'> <MdHome /></span>
        <span className='topbarLink-text'>Home</span>
        </div>
        </Link>
        <Link to="/messanger">
        <div className='topbar-menu-icon ' >
        <span className='topbarLink'> <MdChat /></span>
        <span className='topbarLink-text'>Message</span>
        </div>
        </Link>
        <Link to="/showAllUser">
        <div className='topbar-menu-icon '>
        <span className='topbarLink'> <MdSupervisorAccount /></span>
        <span className='topbarLink-text'>Users</span>
        </div>
        </Link>
        <Link to="/updateuserdata">
        <div className='topbar-menu-icon '>
        <span className="topbarLink"><MdUpdate /></span>
        <span className='topbarLink-text'>Update</span>
        </div>
        </Link>
        
        <div className='topbar-menu-icon '  onClick={()=>{handleclick();
                      handledelete();
        }}>
        <span className="topbarLink" ><MdLogout /></span>
        <span className='topbarLink-text'>Log Out</span>
        </div>
       

      <Link to={`/profile/${user.username}`}>
        <div className='topbar-menu-icon  '>
      <img src={user.profilePhoto ?  PF+user.profilePhoto : PF+"noAvatar.png" } alt='' className='topbar-dp-img ' />
      <span className='topbarLink-text topbar-profile-icon'>Profile</span>
      </div>
      </Link>
     
     </div>
     <div className='menu-hamburger-icon' onClick={handleMenu}>
      {ismenu?<MdClear />: <MdMenu  />}
     
      </div>
     
    
    </div>
    </div>
  )
}

export default Topbar