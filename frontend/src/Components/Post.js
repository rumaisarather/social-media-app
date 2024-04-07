import {Link} from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
 import Comments from "./Comments";
import "./post.css";
  import { useContext,useEffect, useState} from "react";
  import axios from "axios";
  import {format} from "timeago.js";
import { AuthContext } from "./../context/AuthContext";

export default function Post({ post }){
 const [like,setLike] = useState(post.likes.length);
 const[isLiked,setIsLiked] = useState(false);
 const [commentOpen, setCommentOpen] = useState(false);
 const [user,setUser] = useState({});
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 const { user: currentUser } = useContext(AuthContext);

 useEffect(() => {
  setIsLiked(post.likes.includes(currentUser._id));
}, [currentUser._id, post.likes]);


 useEffect(()=>{
  const fetchUser = async ()=>{
   const res = await axios.get(`/users?userId=${post.userId}`);
  setUser(res.data);
  };
 fetchUser();
},[post.userId]);


  const likeHandler =()=>{
    try{
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like -1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                 <div className="postLeft">
                 <Link to={`profile/${user.username}`}>
                  <img className="postImg" src=
                  {user.profilePicture ? PF+ user.profilePicture : PF +"/name.jpg"} 
                    alt=""/>
                  </Link> 
                    <span className="postUsername"> 
                        {user.username} 
                      </span>
                    <span className="postDate">
                          {format(post.createdAt)}
                      </span>
                </div>
                 <div className="postRight">
                    <MoreVert/>
                </div> 
                </div>
            <div className="postCenter">
                    <span className="postText">{post?.desc} </span>
                    <img className="Img" src={PF + post.img} alt=""/>
                    </div>
                    <div className="postBottom">
                        <div className="postBottomLeft">
                             {like ? <FavoriteOutlinedIcon onClick={likeHandler}/> : <FavoriteBorderOutlinedIcon onClick={likeHandler} />}
                              Likes
                        </div>

                        <div className="postBottomLeft" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
             Comments
          </div>
          <div className="postBottomLeft">
            <ShareOutlinedIcon />
            Share
          </div>        
            </div>
            {commentOpen && <Comments postId={post.id} />}
            </div>
        </div> 
  );
}


