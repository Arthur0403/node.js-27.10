const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(session({ keys: ['secret'] }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth', (req, res) => {
  if (req.body.login === 'admin' && req.body.password === 'admin') {
    req.session.username = 'admin';

    res.redirect('/user');
  }

  res.redirect('/auth');
});

app.get('/auth', (req, res) => {
  res.send(`
    <form method="POST" action="/auth">
      <input type="text" name="login" /><br />
      <input type="password" name="password" /><br />
      <input type="submit" value="Send" />
    </form>
  `);
});

app.all('/user', (req, res, next) => {
  if(req.session.username) {
    next();
  } else {
    res.redirect('/auth');
  }
});

app.get('/user', (req, res) => {
  res.send('User page');
})

app.listen(4444);

