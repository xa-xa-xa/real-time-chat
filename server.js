const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;
const router = require('./backend/router');

const app = express();

app.use(router);

const server = app.listen(PORT, () =>
  console.log('server is running on port:', PORT)
);

// SOCKETS
const io = socketIO(server);
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./backend/users');

io.on('connection', socket => {
  console.log('socket: we have connection!');

  socket.on('join', ({ name, room }, callback) => {
    const user = addUser({ id: socket.id, name, room });
    if (user.error) return callback(user.error);

    //admin messages
    socket.emit('message', {
      user: 'admin',
      text: `${user.name} welcome to "${user.room}" room`
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined the room!`
    });

    socket.join(user.room);
    callback();
  });

  // user messages
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log('* getUser:', user);
    io.to(user.room).emit('message', { user: user.name, text: message }),
      callback();
  });

  // end user session
  socket.on('disconnect', () => {
    console.log(`disconnect: user had left chat`);
  });
});

// EXPORT
module.exports = app;
