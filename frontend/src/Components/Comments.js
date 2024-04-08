import { useContext, useEffect, useState } from "react";
import "./comments.css";
 import { Commentx } from "./../dummyData";
import { AuthContext } from "./../context/AuthContext";
import {format} from "timeago.js";
import axios from "axios";

export default function Comments({postId, username}) {
const [comments, setComments] = useState([]);
const [commentText,setCommentText] = useState("");
  const { user: currentUser} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(()=>{
    const fetchComments = async () => {
        const res = await axios.get(`/comments/${postId}`);
        // console.log(res);
      setComments(res.data);
    };
    fetchComments();
  },[]);
const handleClick = async(e)=>{
  e.preventDefault();
 
try{
  await axios.post(`/comments/${postId}`,{
    userId: currentUser._id,
    username: currentUser.username,
    userProfilePicture: "",
    text: commentText
  });
  setCommentText('');
}catch(err){
}
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture || PF +"/name.jpg"} alt="" />
        <input type="text" placeholder="write a comment"  value={commentText} onChange={(e)=> setCommentText(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
     {comments.map(comment => ( 
      <div key={comment._id} className="comment">
          <img src={Commentx.profilePicture || PF +"/name.jpg"} alt="" />
          <div className="info">
            <span>{comment.username}</span>
            <p>{comment.text}</p>
          </div>
          <span className="date">{format(Comment.createdAt)}</span>
        </div>
     ))}  
    </div>
  );
};
