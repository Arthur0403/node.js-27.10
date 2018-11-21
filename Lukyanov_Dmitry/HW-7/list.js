const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });

const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Todo = require('./models/todo');

const app = express();

app.use(bodyParser.json());
app.use(cors());

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


app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password })
  if (user) {
      const { _id: id, username, displayName } = user;
      res.json({
          access_token: jwt.sign({ id, username, displayName }, 'secret'),
      })
  } else {
      res.json({ code: 1, message: 'Wrong credentials' });
  }
});

app.all('/users', identifyUser);
app.all('/users*', identifyUser);

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();

  res.json(user);
});

app.put('/user/:id', async (req, res) => {
  const user = await User.update({ _id: req.params.id }, req.body);

  res.json(user);
});

app.patch('/user/:id', async (req, res) => {
  const user = await User.update({ _id: req.params.id }, { $set: req.body });

  res.json(user);
});

app.delete('/user/:id', async (req, res) => {
  const user = await User.remove({ _id: req.params.id });

  res.json(user);
});

app.listen(3000, function () {
  console.log('Server started port 3000');
});