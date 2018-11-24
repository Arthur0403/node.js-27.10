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

app.get('/tasks', async (req, res) => {
    const tasks = await TaskList.find();
    res.send.json(tasks);
})

app.post('/', async (req, res) => {
    let listitem = new TaskList({text: req.body.newTask, completed: false});
    listitem = await listitem.save();
    const tasks = await TaskList.find();
    res.send.json(tasks);
})

app.delete('/', async(req, res) => {
    const rec = await TaskList.findByIdAndRemove(req.body.delete, () => {
        console.log(`Запись ${req.body.delete} была удалена`);
    })
    const tasks = await TaskList.find();
    res.render('index', {tasks});
})

app.post(`/complete`, async(req, res) => {
    const rec = await TaskList.findByIdAndUpdate(req.body.complete, {completed: true} , () => {
        console.log(`Запись ${req.body.complete} была модифицирована`);
    })
    const tasks = await TaskList.find();
    res.render('index', {tasks});
})

io.on('connection', (socket) => {
    console.log('Connecon estabished');
    socket.on('change', (changes) => {
        changes.timestamp = new Date();
        socket.broadcast.emit('chage', changes);
        socket.emit('change', changes);
    })
})

server.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})