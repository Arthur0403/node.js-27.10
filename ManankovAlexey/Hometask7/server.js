const express = require(`express`);
const bodyParser = require(`body-parser`);
const consolidate = require(`consolidate`);
const path = require(`path`);
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const connection = require(`./connector.js`)
const Task = require('./models/task');
const User = require('./models/user');


const app = express();
const port = 8080;
const secret = 'JWT firts try';

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(
    path.resolve(__dirname, `public`)
))

app.get('/', (req, res) => {
    fs.readFile('./auth.html', (err, data) => {
        if (err) { throw err}
        res.status(200).contentType('html').send(data);
    });   
})

app.post('/auth', async (req, res) => {
    const {username, password} = req.body;
    const user = await user.
})

// app.get(`/`, async (req, res) => {
//     const tasks = await todoList.find();
//     res.render(`index`, {tasks});
// })

// app.post(`/`, async (req, res) => {
//     let listitem = new todoList({task: req.body.newTask, completed: false});
//     listitem = await listitem.save();
//     const tasks = await todoList.find();
//     res.render(`index`, {tasks});
// })

// app.post(`/delete`, async(req, res) => {
//     const rec = await todoList.findByIdAndRemove(req.body.delete, () => {
//         console.log(`Запись ${req.body.delete} была удалена`);
//     })
//     const tasks = await todoList.find();
//     res.render(`index`, {tasks});
// })

// app.post(`/complete`, async(req, res) => {
//     const rec = await todoList.findByIdAndUpdate(req.body.complete, {completed: true} , () => {
//         console.log(`Запись ${req.body.complete} была модифицирована`);
//     })
//     const tasks = await todoList.find();
//     res.render(`index`, {tasks});
// })

app.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})