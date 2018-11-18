const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const crypto = require('crypto');
const connection = require('./connector.js');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
const port = 8080;

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(cookieParser());
app.use(session({ keys: ['secret'] }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(
    path.resolve(__dirname, 'public'),
))

function chiferWork(str, salt, type){
    if (type === 'encode'){
        let key = crypto.createCipher('aes192', salt);
        let chifStr = key.update(str, 'utf8', 'hex');
        chifStr += key.final('hex');
        return chifStr;
    } else if (type === 'decode'){
        let key = crypto.createDecipher('aec192', salt);
        let chifStr = key.update(str, 'hex', 'utf8');
        chifStr += key.final('utf8');
        return chifStr;
    }
}

app.get('/', (req, res) => {
    res.redirect('/auth');
})

app.get('/auth', (req, res) => {
    // console.log(req.session)
    // console.log(req.sessionOptions)
    if(req.session.username){
        res.redirect('/main')
    } else {
        res.render('auth');
    }
}) 

app.get('/main', async (req, res) => {
    console.log(req.session)
    console.log(req.sessionOptions)
    const tasks = await Task.find();
    res.render('index', {tasks});
})

app.post('/main', async (req, res) => {
    let listitem = new Task({task: req.body.newTask});
    listitem = await listitem.save();
    const tasks = await Task.find();
    res.render('index', {tasks});
})

app.post('/delete', async (req, res) => {
    await Task.findByIdAndRemove(req.body.delete, () => {
        console.log(`Запись ${req.body.delete} была удалена`);
    })
    const tasks = await Task.find();
    res.render('index', {tasks});
})

app.post('/complete', async (req, res) => {
    await Task.findByIdAndUpdate(req.body.complete, {completed: true} , () => {
        console.log(`Запись ${req.body.complete} была модифицирована`);
    })
    const tasks = await Task.find();
    res.render('index', {tasks});
})

app.post('/auth', async (req, res) => {
    const user = await User.findOne({name: req.body.login});
    if (req.body.login === user.name && chiferWork(req.body.password,'salt','encode') === user.password) {
        if (req.body.memo === 'checked'){
            req.sessionOptions.maxAge = 24*60*60*1000;
            console.log(req.sessionOptions.maxAge)
            req.session.username = 'admin';
        } else {
            req.sessionOptions.maxAge = 15*60*1000;
            console.log(req.sessionOptions.maxAge)
            req.session.username = 'admin';
        }
        res.redirect('/main');
    } else {
        res.redirect('/auth');
    }
})

app.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})