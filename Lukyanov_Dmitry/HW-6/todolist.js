const express = require('express');
const passport = require('passport');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Strategy = require('passport-local').Strategy;
var db = require('./db');
const Todo = require('./models/todo');


passport.use(new Strategy(
  function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

var app = express();
mongoose.connect('mongodb://localhost/todo');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'models')));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
  function (req, res) {
    res.render('home', {
      user: req.user
    });
  });

app.get('/list', function (req, res) {
  Todo.find({}, function (err, todoList) {
    if (err) {
      console.log(err);
    } else {
      res.render('list', {
        allList: todoList
      });
      require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
          res.render('profile', {
            user: req.user
          });
        }
    }
  });
});

app.get('/login',
  function (req, res) {
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/list');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user,
    });
  });

app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });


app.post('/add-todo', (req, res) => {
  const addTodo = new Todo({
    name: req.body.item,
  });
  Todo.create(addTodo, (err, todo) => {
    if (err) console.log(err);
  });
  res.redirect('/list');
});

app.post('/del-todo', (req, res) => {
  const id = req.body.id;
  Todo.findByIdAndRemove(id, (err) => {
    console.log(err);
  });
  res.redirect('/list');
});

app.post('/compl-todo',(req, res) => {
    const rec = Todo.findByIdAndUpdate(req.body.completed, () => { 
})
res.redirect('/list');
})

app.listen(3000, function () {
  console.log('Server started port 3000');
});
