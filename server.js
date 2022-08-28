// // const path = require('path');
// // const http = require('http');
// // const express = require('express');
// // const socketio = require('socket.io');
// // const app = express();
// // const server = http.createServer(app);
// // const io = socketio(server);

// // // Set static folder
// // // app.use(express.static(path.join(__dirname, 'public')));

// // //Socket setup 
// // io.on('connection', socket => {
// //     console.log("Socket Connected");

// //     socket.on('chat',function(data){
// //         io.sockets.emit('chat',data);
// //     });

// //     socket.on('typing',function(data){
// //         socket.broadcast.emit("typing",data)
// //     });
// // });



// // const PORT = 9000;

// // server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const path = require('path')
// const app = express();
// const server = app.listen('9000' , ()=>{
//     console.log('server created')
// })

// const io = require('socket.io')(server)
// app.use(express.static('public'));
// io.on('connection' , ()=>{
//     console.log("socket connection successfull");
// })

// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app)
// const io = require('socket.io')(server);
//  const path = require('path');
//  app.use(express.static(path.join(__dirname, 'public')));
// io.on('connection' , socket=>{
//     console.log("socket io worked")
// })
// server.listen('2001' , ()=>{
//     console.log("server created successfully");
// })



const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

const users = {};
io.on('connection', function(socket){
   console.log('A user connected');
   socket.on('new-user-added', name =>{
      users[socket.id] = name;
      console.log(name , 'name'),   
      console.log(users)
      socket.broadcast.emit('user-added' , name)
   })
   socket.on('typing' , data =>{
      socket.broadcast.emit('typing' , {name : users[socket.id]})
   })
   socket.on('send', message=>{
      socket.broadcast.emit('recieve' , {message : message , name : users[socket.id]})
   })
});
http.listen(9000, function(){
   console.log('listening on localhost:9000');
});