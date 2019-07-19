const users = [];

// Add user, removeUSer,getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate the data
  if (!username || !room) {
    return {
      error: "username and room are required"
    };
  }

  // check for existing users
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });

  // validate username
  if (existingUser) {
    return {
      error: "Username is in use"
    };
  }

  // Store users
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  return users.find(user => user.id === id);
};

const getUserInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

addUser({
  id: 11,
  username: "phone",
  room: "test"
});
addUser({
  id: 12,
  username: "phone2",
  room: "test"
});
addUser({
  id: 13,
  username: "phone3",
  room: "new"
});

const user = getUser(13);
console.log(user);

const userList = getUserInRoom("test");
console.log(userList);

// const removedUser = removeUser(11);
// console.log(removedUser);
// console.log(users);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserInRoom
};
