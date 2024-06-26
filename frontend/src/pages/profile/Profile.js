import "./profile.css";
import Topbar from "../../Components/Topbar";
import Sidebar from '../../Components/Sidebar';
import  Feed  from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
 import { useEffect,useState } from "react";
 import axios from "axios";
 import { useParams } from "react-router";

export default function  Profile () {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [user,setUser] = useState({});
   const username = useParams().username;
   
 useEffect(()=>{
  const fetchUser = async ()=>{
    const res = await axios.get(`/users?username=${username}`);
  setUser(res.data);
  };
  fetchUser();
 },[username]);

  return (
    <>
    <Topbar/>
  <div className="profile">
  <Sidebar/>
  <div className="profileRight">
    <div className="profileRightTop">
      <div className="profCover">
      <img className="profileCover" src={user.coverPicture || PF + "/cover.webp"}
                 alt=""/>
      <img className="profileUser" src={
                  user.profilePicture || PF + "/name.jpg"
                } alt=""/>
      </div>
      <div className="profileInfo">
        <h4 className="profileInfoName">
           {user.username} 
          </h4>
        <span className="profileInfoDesc">
           {user.desc} 
          </span>
      </div>
    </div>
      <div className="profileRightBottom">
      <Feed username={username} />
     <Rightbar user={user} />
  </div>
  </div>
  
  </div>
</>
  );
}


