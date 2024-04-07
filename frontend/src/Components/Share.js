import "./share.css";
import { EmojiEmotions, PermMedia,Label,Room ,Cancel} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import {AuthContext} from "./../context/AuthContext";
import axios from "axios";

export default function Share() {
    const {user} = useContext(AuthContext);
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const[file,setFile] =useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
           if (file) {
            const data = new FormData();
           const fileName = Date.now() + file.name;
           data.append("name", fileName);
          data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
           try {
            await axios.post("/upload", data);
           } catch (err) {
            
           }
        }
        try {
          await axios.post("/posts", newPost);
        window.location.reload();
        } catch (err) {}
      };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                 <img className="shareprofile" src={user.profilePicture ? PF + user.profilePicture : PF+"/name.jpg"} alt="" /> 
                    <input placeholder= {"What's in your mind" + user.username + "?"} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOpt">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="OptionText">Photo or Video</span>
                            <input style={{display:"none"}} type="file" id= "file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOpt">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="OptionText">Tag</span>
                        </div>
                        <div className="shareOpt">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="OptionText">Location</span>
                        </div>
                        <div className="shareOpt">
                            <EmojiEmotions htmlColor="yellow" className="shareIcon" />
                            <span className="OptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton"type="submit">Share</button>
                    </form>
                </div>
            </div>
    
    )
}


