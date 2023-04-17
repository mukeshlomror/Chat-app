import React, {useState} from 'react'
import './Chat.css'
import axios from './axios';

import { Avatar, IconButton } from '@material-ui/core';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';

const Chat = ({ messages }) => {

  const [input, setInput] = useState("");


  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message:input,
      name: "demo",
      timestamp: "just now",
      received: false,
    });

    setInput('');
  };

  return (
    <div className='chat'>

       <div className="chat__header">
        <Avatar/>

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
          <SearchRoundedIcon/>
          </IconButton>

          <IconButton>
          <AttachFileRoundedIcon/>
          </IconButton>

          <IconButton>
          <MoreVertRoundedIcon/>
          </IconButton>
        </div>
       </div>


       <div className="chat__body">
        {messages.map((message) => ( 
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
          <span className='chat__name'>{message.name}</span>
           {message.message}
           <span className='chat__timestamp'>
              {message.timestamp}
           </span>
        </p>
        ))}
       </div>


       <div className="chat__footer">
         <IconButton>
             <SentimentSatisfiedRoundedIcon/>
         </IconButton>
         <form>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
            <button onClick={sendMessage} type="submit" >Send a message</button>
          </form>

          <IconButton>
            <MicNoneRoundedIcon/>
          </IconButton>
       </div>
    </div>
  )
}

export default Chat