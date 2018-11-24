const path = require('path');
const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const Socket = require('socket.io');
const Todo = require('./models/todo');
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });

const app = express();
app.use(express.static(path.join(__dirname, 'models')));
app.use(bodyParse.urlencoded({extended: true}));

const server = http.Server(app);
const io = Socket(server);



// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// });

app.get('/', function (req, res) {
    Todo.find({}, function (err, todo ) {
        if (err){
            console.log(err);
        }
        else {      
            res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
        }
    });
});



io.on('connection', (socket) => {
  console.log('User has been connected');

  socket.on('todo', (todo) => {
    const todoAdd = new Todo(todo);
    Todo.create(todoAdd, (err, todo) => {
        console.log(todoAdd.name)
        if (err) console.log(err);
       
       
    });       
    socket.broadcast.emit('todo', todo );
    socket.emit('todo', todo );
   
  });
});

server.listen(3000, () => {
  console.log('Server has been started on port: 3000');
});