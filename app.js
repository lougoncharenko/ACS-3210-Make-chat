const express = require('express');
const app = express();
const server = require('http').Server(app);

// Sokcet.io
const io = require('socket.io')(server);
//We'll store our online users here
let onlineUsers = {};
io.on("connection", (socket) => {
  require('./sockets/chat.js')(io, socket, onlineUsers);
})

// //Express View Engine for Handlebars
// const exphbs  = require('express-handlebars');
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ /* config */ });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index.handlebars');
  })

server.listen('3000', () => {
console.log('Server listening on Port 3000');
})