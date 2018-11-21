const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// подключение экспресса, регистрация боди парсера
mongoose.connect('mongodb://localhost/task', {useNewUrlParser:true});
mongoose.connect('mongodb://localhost/users', {useNewUrlParser:true})
const Task = require('./models/task');
const User = require('./models/users');
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'))
app.use(passport.initialize());
app.use(passport.session());

const authHandler = passport.authenticate('local', {
	successRedirect: '/user',
	failureRedirect: '/auth',
})

const mustBeAuthenticated = (req,res,next)=>{
	if (req.user){
		next();
	} else {
		res.redirect('/auth');
	}
}

passport.use(new LocalStrategy(
function(username, password, done) { 
    User.findOne({ 'username' :  username }, 
    	function(err, user) {
        if (err)
        	return done(err);
        if (!user){
        	console.log('User Not Found with username '+username);
        	return done(null, false, 
        		console.log('User Not found.'));                 
        }
        return done(null, user);
      }
      );
  }));

passport.serializeUser((user,done)=>{
	done(null,user._id);
})
passport.deserializeUser((id,done)=>{
	User.findById(id, (err,user)=>{
		done(err,user);
	})
})

// логика
app.all('/user', mustBeAuthenticated)
app.get('/user', async (req,res)=>{
	let users = await User.find();
	res.json(users);
})
app.get('/auth', async (req,res)=>{
	res.render('login');
})
app.post('/auth', authHandler); 
app.get('/tasks', async (req,res)=> {
	let tasks = [];
	tasks = await Task.find();
	console.log(tasks)
	res.render('list', {
		cards: tasks
	});
})
app.post('/tasks', async (req,res)=>{
	let task = new Task(req.body);
	task = await task.save();
	res.json(tasks);
})
app.get('/tasks/delete', async (req,res)=> {
	const tasks = await Task.find();
	res.json(tasks);
})
app.post('/tasks/delete', async (req,res)=>{
	console.log(req.body.name)
	let one = req.body.id
	console.log(one)
	const tasks = await Task.deleteOne({"content":req.body.content}, (err)=>{
		res.send('запрос прошел')
		})
	});

//update
app.get('/tasks/update', async (req,res)=> {
	const tasks = await Task.find();
	res.json(tasks);
})
app.post('/tasks/update', async (req,res)=>{
	console.log(req.body.name)
	let one = req.body.id
	console.log(one)
	const tasks = await Task.updateOne({"content":req.body.content},{$set:{'completed':true}}, (err)=>{
		res.send('запрос прошел')
		})
	});

app.get('/', (req,res)=>{
	res.render('todo');
});


app.listen(8888);
