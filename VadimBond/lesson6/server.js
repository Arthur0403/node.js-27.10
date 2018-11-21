const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const path = require('path');

const db = require('./db');
const tasksController = require('./controllers/tasks');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

passport.use(new LocalStrategy((username, password, done) => {
	if(username !== 'bvv') {
		return done(null, false);
	}
	if(password !== 'bvv') {
		return done(null, false);
	}
	done(null, { id: 1, username: 'bvv' });
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	done(null, { id: 1, username: 'bvv' });
});

const authHandler = passport.authenticate('local', {
	successRedirect: '/tasks',
	failureRedirect: '/',
});

const mustBeAuthenticated = (req, res, next) => {
	if(req.user) {
		next();
	} else {
		res.redirect('/');
	}
};

app.all('/tasks', mustBeAuthenticated);
app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);
app.all('/tasks/*', mustBeAuthenticated);

app.get('/', (req, res) => {
	res.render('login', {});
});

app.post('/', authHandler);

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/tasks', tasksController.getAll);

app.post('/add', tasksController.add);

app.post('/change/:id', tasksController.change);

app.post('/complete/:id', tasksController.complete);

app.post('/delete/:id', tasksController.delete);


db.connect('mongodb://localhost/tasks', (err) => {
	if (err) {
		return console.log(err);
	}
	app.listen(3000, () => {
		console.log('server express started on port 3000...');
	});
});
