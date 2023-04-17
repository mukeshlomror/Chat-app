import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';


const Sidebar = () => {
  return (
    <div className='sidebar'>
     {/* ---------- 1st part ----------- */}
     <div className="sidebar__header">
        <Avatar src='./myavatar.jpg'/>
        <div className="sidebar__headerRight">
            <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
               <MoreVertRoundedIcon/>
            </IconButton>
         
        </div>
     </div>


     {/* ---------- 2nd part ----------- */}
     <div className="sidebar__search">
      <div className="sidebar__searchContainer">
        <PersonSearchRoundedIcon/>
        <input placeholder="Search or start new chat" type="text" />
      </div>
     </div>

     {/* ---------- 3nd part ----------- */}
     <div className="sidebar__chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
     </div>
    </div>
  )
}

export default Sidebar