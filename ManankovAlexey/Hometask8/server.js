const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const Socket = require('socket.io');
const connection = require('./connector.js')
const TaskList = require('./models/task');

const app = express();
const server = http.Server(app);
const io = Socket(server);
const port = 8080;

app.use(bodyParser.json());
app.use(express.static(
    path.resolve(__dirname, 'public')
))

app.get('/', async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

io.on('connection', (socket) => {
    console.log('Connecon estabished');
    socket.on('add', async (entry) => {
        let listitem = new TaskList({text: entry.text});
        listitem = await listitem.save();
        const tasks = await TaskList.find();
        socket.emit('loadpage', tasks);
    })
    socket.on('modify', async (entry) => {
        const rec = await TaskList.findByIdAndUpdate(entity.text, {completed: true} , () => {
            console.log(`Запись ${entry.complete} была модифицирована`);
        })
        const tasks = await TaskList.find();
        socket.emit('loadpage', tasks);
    })
    socket.on('delete', async (entry) => {
        const rec = await TaskList.findByIdAndRemove(entry.id, () => {
            console.log(`Запись ${entry.id} была удалена`);
        })
        const tasks = await TaskList.find();
        socket.emit('loadpage', tasks);
    })
    socket.on('loadpage', async (changes) => {
        console.log('Changes -> ' + changes)
        const tasks = await TaskList.find();
        socket.broadcast.emit('chage', tasks);
        socket.emit('loadpage', tasks);
    })
})

server.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})