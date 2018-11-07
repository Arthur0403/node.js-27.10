const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');

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