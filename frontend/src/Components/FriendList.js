import "./friendList.css";


export default  function FriendList({user}) {
 const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
<img className="friendImg" src= {PF+ user.profilePicture}alt=""/>

<span className="FriendName">{user.username}</span>
    </li>
      

  );
}


