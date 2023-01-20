const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const config = require('./config').config;
const socketIO = require('socket.io')(http, {
   cors: {
       origin: "http://localhost:3000"
   }
});


app.use(cors())
let users = []

socketIO.on('connection', (socket) => {
   console.log(`${socket.id} user just connected!`)
   socket.on("message", data => {
       console.log(data)
       socketIO.emit("messageResponse", data)
   })

   socket.on("typing", data => (
       socket.broadcast.emit("typingResponse", data)
   ))

   socket.on("newUser", data => {
       users.push(data)
       socketIO.emit("newUserResponse", users)
   })

   socket.on('disconnect', () => {
       console.log('A user disconnected');
       users = users.filter(user => user.socketID !== socket.id)
       socketIO.emit("newUserResponse", users)
       socket.disconnect()
   });
});


http.listen(config.port, () => {
   console.log(`Server listening on ${config.port}`);
});