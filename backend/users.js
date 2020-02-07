const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const error = { error: 'This username is taken!' };

  const isExistingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (!isExistingUser) {
    const user = { id, name, room };
    users.push(user);

    return user;
  } else {
    return error;
  }
};

const removeUser = id => {
  const userToRemove = users.find(user => user.id === id);
  if (userToRemove !== -1) {
    return users.splice(userToRemove, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
