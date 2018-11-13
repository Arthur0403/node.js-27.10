const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const todo = require('./models/todo');

const app = express();
mongoose.connect('mongodb://localhost/todo');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'models')));

app.use(bodyParse.urlencoded({extended: true}));


app.get('/', function (req, res) {
    todo.find({}, function (err, todoList) {
        if (err) console.log(err);
        else {
            res.render('index.ejs', {
                allList: todoList
            });
        }
    });
});


app.post('/add-todo', (req, res) => {
    const addTodo = new todo({
        name: req.body.item,
    });
    todo.create(addTodo, (err, todo) => {
        if (err) console.log(err);
    });
    res.redirect('/');
});


app.post('/del-todo', (req, res) => {
    const id = req.body.id;
    todo.findByIdAndRemove(id, (err) => {
        console.log(err);    
    });
    console.log(id)
     res.redirect('/');
  });



app.listen(3000, function () {
    console.log('Server started port 3000');
});
