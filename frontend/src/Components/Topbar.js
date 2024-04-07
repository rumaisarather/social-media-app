import "./topbar.css";
import { Person, Chat, Notifications, } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
const [isOpen,setIsOpen] = useState(false);

  const { user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
  const handleLogout =()=>{
    dispatch({type:"LOGOUT"});
  }

 useEffect(()=>{
   document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
     anchor.addEventListener('click',function(e){
       e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior:'smooth'
       });
     });
   });
},[]);

const toggleDropdown =()=>{
  setIsOpen(!isOpen);
};

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
          <span className="logo">LetsHang</span>
        <a href="/"><HomeOutlinedIcon /></a>
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchOutlinedIcon />
          <input placeholder="Search for friends,posts,videos" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIconItem">
         <a href="#FriendList" ><Person className="rightIcons" /></a>
          <a href="Messenger"><Chat className="rightIcons" /></a>
          <Notifications className="rightIcons"  onClick={toggleDropdown}/>
{isOpen && (
  <div className="dropdown-menu">
    <ul>
      <li>New friends Request..</li>
      <li>Kate kally shares a Post..</li>
      <li>John likes your Posts..</li>
      <li>2 friends commented on your Post..</li>
    </ul>
    </div>
)}
</div>

        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF + user.profilePicture
            : PF + "/name.jpg"} 
            alt="" className="topbarImg" />
        </Link>
        <span onClick={handleLogout}>{user.username && "logout"}</span> 
    </div>
    </div>
  );
}



