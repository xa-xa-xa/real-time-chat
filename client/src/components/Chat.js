import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState('');

  const ENDPOINT = 'localhost:5000';

  // Users joining and leaving a chatroom handler
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, () => {});
    console.log(name, room);
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // Update messages handler
  useEffect(() => {
    socket.on('message', message => setMessages([...messages, message]));
    // cleanup
    // return () => {};
  }, [messages]);

  // Sending a messages handler
  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  // render
  return (
    <div className='flex w-3/4 mx-auto bg-teal-200 flex-col my-4 border-round'>
      <div className='w-full bg-red-400 text-xl text-center'>Room: {room}</div>
      <div>CHAT: {messages.length}</div>
      <InfoBar />

      <div className='pb-6 px-4 flex-none'>
        <div className='flex rounded-lg border-2 border-grey overflow-hidden'>
          <span className='text-3xl text-grey border-r-2 border-grey p-2 bg-white hover:bg-green-200'>
            <svg
              className='fill-current h-6 w-6 block'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z' />
            </svg>
          </span>
          <input
            type='text'
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
            className='w-full px-4'
            placeholder='type here'
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
