const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');

// подключение экспресса, регистрация боди парсера
mongoose.connect('mongodb://localhost/task', {useNewUrlParser:true})
const Task = require('./models/task')

const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'))

// логика
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
