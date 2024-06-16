// This is the server
module.exports = (io, socket) => {

     // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat! ✋`);
    // io.emit sends data to all clients on the connection.
    io.emit("new user", username);
  })

   //Listen for new messages
   socket.on('new message', (data) => {
    // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.emit('new message', data);
  })

  }