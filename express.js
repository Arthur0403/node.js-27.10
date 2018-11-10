const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const Animal = require('./models/animal');

const app = express();

app.use(
  express.static(
    path.resolve(__dirname, 'public')
  )
);

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use((req, res, next) => {
  req.user = { name: 'Vasya Pupkin' };
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

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

app.get('/users', (req, res) => {
  res.send('User');
});

app.get('/users/:username', (req, res) => {
  res.render('user', {
    username: req.params.username,
    features: ['MySQL', 'MongoDB', 'RethinkDB'],
  });
});

app.post('/users', (req, res) => {
  res.send('OK');
});

app.listen(8888);