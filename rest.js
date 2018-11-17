const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const jwt = require('jsonwebtoken');

const Animal = require('./models/animal');

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

app.all('/animals', identifyUser);
app.all('/animals*', identifyUser);

app.get('/animals', async (req, res) => {
  const animals = await Animal.find();
  res.json(animals);
});

app.get('/animals/:id', async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  res.json(animal);
});

app.post('/animals', async (req, res) => {
  let animal = new Animal(req.body);
  animal = await animal.save();

  res.json(animal);
});

app.put('/animal/:id', async (req, res) => {
  const animal = await Animal.update({ _id: req.params.id }, req.body);

  res.json(animal);
});

app.patch('/animal/:id', async (req, res) => {
  const animal = await Animal.update({ _id: req.params.id }, { $set: req.body });

  res.json(animal);
});

app.delete('/animal/:id', async (req, res) => {
  const animal = await Animal.remove({ _id: req.params.id });

  res.json(animal);
});

app.listen(8888);