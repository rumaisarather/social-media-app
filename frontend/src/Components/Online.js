import "./online.css";

export default function Online({user}) {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="friendListItem">
    <div className="profilePic">
      <img className="profileImg" src={ PF+ user.profilePicture} alt=""/>
      <span className="Online"></span>
    </div>
    <span className="username">{user.username}</span>
    </li>
  );
}


