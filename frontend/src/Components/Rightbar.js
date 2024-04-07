
import Online from "./Online";
import "./rightbar.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect ,useState} from 'react';
import {Link} from "react-router-dom";
import { Users } from "./../dummyData";
import axios from "axios";
import { AuthContext } from "./../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({user}) {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [friends, setFriends] = useState([]);
   const { user: currentUser, dispatch } = useContext(AuthContext);
   const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const  HomeRightbar=()=>{
    return(
      <>
      <div className='BirthContainer'>
          <img className='BirthImg' src="assets/images/GIFT.jpeg" alt="" />
          <span className='BirthText'><b>Jose</b> <b>and Kalley</b>have a birthday today</span>
        </div>
        <hr />
        <div className='advertise' data-aos="flip-down">
          <h4 className='rightTitle'>Online Shoppings</h4>
          <p>Style yourself with the best outfit thats suits you..</p>
          <img className='rightAd' src="assets/images/fashion.jpg" alt="" />
        </div>
        <hr />
        <div className='advertise' data-aos="flip-down">
          <h4 className='rightTitle'>Order your food</h4>
          <p>Order your favourite food near your location within mins..</p>
          <img className='rightAd' src="assets/images/foody.jpg" alt="" />
        </div>
        <hr />
        <div className='advertise' data-aos="flip-down">
          <h4 className='rightTitle'>Book your Trip</h4>
          <p>Book a holiday with your friends and enjoy your life..</p>
          <img className='rightAd' src="assets/images/beach.jpg" alt="" />
        </div>
        <hr />
        <div className='advertise' data-aos="flip-down">
          <h4 className='rightTitle'>Beautiful Quotes</h4>
          <p>Find best Motivational quotes here.. </p>
          <img className='rightAd' src="assets/images/blog2.jpg" alt="" />
        </div>

        <hr />
        <h4 className='rightTitle'>Online Friends</h4>
        <ul className="friendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
     return (
      <>
       {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
        {followed ? "Unfollow" : "Follow"}
        {followed ? <Remove /> : <Add />}
      </button>
    )}
        <h4 className="rightTitle">UserInformation</h4>
        <div className="rightInfo">
           <div className="rightInfoItem">
             <span className="InfoKey">City:</span>
             <span className="InfoValue">{user.city}</span>
           </div>
          <div className="rightInfoItem">
             <span className="InfoKey">Relationship:</span>
             <span className="InfoValue">{user.relationship ===1 ? "Single" :user.relationship ===2 ? "Married": "-"}</span>
           </div>
         </div>
         <h4 className="rightTitle">User Friends</h4>
        <div className="followings">
          {friends.map((friend)=>(
            <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
          >
             <div className="following">
             <img className="followingImg" src={friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "/name.jpg"} alt=""
           />
             <span className="followingName">{friend.username}</span>
          </div>
          </Link>
           ))} 
      </div>
       </>
    )
         }
  return (
    <div className="rightbar">
      <div className="rightWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

 


