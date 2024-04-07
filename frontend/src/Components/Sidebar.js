import React from 'react';
import "./sidebar.css";
import { RssFeed,Group,PlayCircleFilledOutlined,Bookmark,Chat,Star } from '@mui/icons-material';
import {Users} from "./../dummyData";
import FriendList from './FriendList';

export default function  Sidebar ()  {
  return (
    <div className="sidebar">
        <div className='wrapper'>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeed className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Feed</span>
                </li>
                <li className="sidebarListItem">
                    <Chat className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Chats</span>
                </li>
                <li className="sidebarListItem">
                    <Group className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Groups</span>
                </li>
                <li className="sidebarListItem">
                    <PlayCircleFilledOutlined className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Videos</span>
                </li>
                <li className="sidebarListItem">
                    < Star className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Favourites</span>
                </li>
                <li className="sidebarListItem">
                    <Bookmark className='sidebarIcon'/>
                    <span className='sidebarListItemText'>Saved</span>
                </li>
            </ul>
            <button className='sidebarButton'>Show More</button>
            <hr className='sidebarHr'/>
    <div id="FriendList">
            <ul className="sidebarFriendList">
          {Users.map((u) => (
            <FriendList key={u.id} user={u} />
          ))}

            </ul>
            </div>
            </div>
        </div>
    
  )
}

