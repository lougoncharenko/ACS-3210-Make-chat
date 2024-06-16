//chat.js
module.exports = (io, socket) => {

     // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // io.emit sends data to all clients on the connection.
    io.emit("new user", username);
  })
  }