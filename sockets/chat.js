// This is the server
module.exports = (io, socket, onlineUsers, channels) => {

    //Have the socket join the room of the channel
    socket.on('user changed channel', (newChannel) => {
        socket.join(newChannel);
        socket.emit('user changed channel', {
        channel : newChannel,
        messages : channels[newChannel]
        });
    });

  // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
    // Send the existing channels to the new user
    socket.emit('get channels', channels);
  })

   //Listen for new messages
   socket.on('new message', (data) => {
    // Save the message to the channel's message array
    channels[data.channel].push({ sender: data.sender, message: data.message });
    // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.emit('new message', data);
  })

  // Listen for online users
  socket.on('get online users', () => {
    //Send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  })

  // This fires when a user closes out of the application
  // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
    socket.on('disconnect', () => {
        //This deletes the user by using the username we saved to the socket
        delete onlineUsers[socket.username]
        io.emit('user has left', onlineUsers);
    });

    // listen for new channel creation
    socket.on('new channel', (newChannel) => {
        console.log(newChannel);
        //Save the new channel to our channels object. The array will hold the messages.
        channels[newChannel] = [];
        //Have the socket join the new channel room.
        socket.join(newChannel);
        //Inform all clients of the new channel.
        io.emit('new channel', newChannel);
        //Emit to the client that made the new channel, to change their channel to the one they made.
        socket.emit('user changed channel', {
        channel : newChannel,
        messages : channels[newChannel]
        });
      });

    // Have the socket join the room of the channel
    socket.on('user changed channel', (newChannel) => {
        socket.join(newChannel);
        socket.emit('user changed channel', {
        channel: newChannel,
        messages: channels[newChannel]
        });
    });


}