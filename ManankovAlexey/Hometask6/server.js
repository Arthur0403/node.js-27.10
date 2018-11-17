const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const connection = require('./connector.js');
const todoList = require('./models/todolist');
const userList = require('./models/users');

const app = express();
const port = 8080;

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));


app.use(cookieParser());
app.use(session({ keys: ['secret'] }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(
    path.resolve(__dirname, 'public')
))

app.get('/', (req, res) => {
    res.redirect('/auth');
})

app.get('/auth', (req, res) => {
    res.render('auth');
}) 

app.get('/main', async (req, res) => {
    const tasks = await todoList.find();
    res.render('index', {tasks});
})

app.post('/main', async (req, res) => {
    let listitem = new todoList({task: req.body.newTask, completed: false});
    listitem = await listitem.save();
    const tasks = await todoList.find();
    res.render('index', {tasks});
})

app.post('/delete', async(req, res) => {
    await todoList.findByIdAndRemove(req.body.delete, () => {
        console.log(`Запись ${req.body.delete} была удалена`);
    })
    const tasks = await todoList.find();
    res.render('index', {tasks});
})

app.post('/complete', async(req, res) => {
    await todoList.findByIdAndUpdate(req.body.complete, {completed: true} , () => {
        console.log(`Запись ${req.body.complete} была модифицирована`);
    })
    const tasks = await todoList.find();
    res.render('index', {tasks});
})

app.post('/auth', async (req, res) => {
    const users = await userList.find();
    if (req.body.login === users.name && req.body.password === users.password) {
        if (req.body.memo === 'checked'){
            req.session.username = 'admin';
        }
        res.redirect('/main');
    }
    res.redirect('/auth');
})

app.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})