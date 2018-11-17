const express = require('express');
const bodyParser = require('body-pasrser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  if(username !== 'admin') {
    return done(null, false);
  }

  if(password !== 'admin') {
    return done(null, false);
  }

  // После получения пользователя из БД не забудьте удалить поле пароля из объекта
  // Пароль пользователя можно зашифровать с помощью встроенного пакета crypto
  done(null, { id: 1, username: 'admin', name: 'Vasya Pupkin' });
}));

passport.serializeUser((user, done) => {
  // Здесь мы должны использовать какое-нибудь поле, с пом. которого
  // можно уникальным образом идентифицировать пользователя
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  // После получения пользователя из БД не забудьте удалить поле пароля из объекта
  done(null, { id: 1, username: 'admin', name: 'Vasya Pupkin' });
});

const authHandler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});

app.get('/auth', (req, res) => {
  res.send('TODO: Login form');
});

app.post('/auth', authHandler);

const mustBeAuthenticated = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth');
  }
}

app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);

app.get('/user', (req, res) => {
  res.send('TODO: User page');
});

app.get('/user/settings', (req, res) => {
  res.send('TODO: User settings');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

app.listen(8888);