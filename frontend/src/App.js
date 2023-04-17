import React, { useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
//import { response } from 'express';

function App() {
  
  const [messages, setMessages] = useState([]);


 useEffect(() => {
     axios.get('/messages/sync').then(response => {
      setMessages(response.data);
     })
 },[]);


  useEffect(() => {
    const pusher = new Pusher('e9553a9329075c7df390', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

   return () => {
    channel.unbind_all();
    channel.unsubscribe();
   };

  }, [messages]);
 
  console.log(messages);


  return (
    <div className="app">
    <div className="app__body">
     {/* Sidebar */}
     <Sidebar/>

    {/* Chat component */}
    <Chat messages={messages}/>
    </div>
    </div>
  );
}

export default App;
