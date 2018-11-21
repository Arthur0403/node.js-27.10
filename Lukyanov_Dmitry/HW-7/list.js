const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('./models/user');
const Todo = require('./models/todo');

mongoose.connect('mongodb://localhost/todo');
const app = express();



app.use(bodyParser.json());
app.use(cors());

app.use(express.static
  (path.join(__dirname, 'models')
));


//user

function identifyUser(req, res, next) {
  if(req.headers.authorization) {
    const [, token] = req.headers.authorization.split(' ');

    jwt.verify(token, 'secret', function(err, decoded) {
      if(err) {
        return res.status(403).json({ error: 'Wrong token' });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(403).json({ error: 'No token present' });
  }
}

app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  if(username === 'admin' && password === 'admin') {
    const token = jwt.sign({
      id: 1,
      username: 'admin',
      fullName: 'Vasya Pupkin',
    }, 'secret');

    res.json({ token });
  } else {
    res.json({ error: 'Wrong credentials' });
  }
});

app.all('/todo', identifyUser);
app.all('/todos*', identifyUser);


// Todo 

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

app.post('/todos', async (req, res) => {
  let todo = new Todo(req.body);
  todo = await todo.save();
  res.json(todo);
});

app.put('/todo/:id', async (req, res) => {
  const todo = await Todo.update({ _id: req.params.id }, req.body);
  res.json(todo);
});

app.patch('/todo/:id', async (req, res) => {
  const todo = await Todo.update({ _id: req.params.id }, { $set: req.body });
  res.json(todo);
});

app.delete('/todo/:id', async (req, res) => {
  const todo = await Todo.remove({ _id: req.params.id });
  res.json(todo);
});


app.listen(3000, function () {
  console.log('Server started port 3000');
});