const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const mongoose = require('mongoose');

require('./models/connectDB');
const TaskModel = require('./models/taskModel');

const app = express();

app.use(
	express.static(
		path.resolve(__dirname, 'public')
	)
);

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

/*app.use((req, res, next) => {
	req.user = { name: 'Vasya Pupkin' };
	next();
});*/

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send({ message: 'Hello world' });
});

app.get('/tasks', async (req, res) => {
	const tasks = await TaskModel.find();

	res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
	const task = await TaskModel.findById(req.params.id);

	res.json(task);
});

app.post('/tasks', async (req, res) => {
	let task = new TaskModel(req.body);
	task = await task.save();

	res.json(task);
});

/*app.get('/users', (req, res) => {
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
});*/

app.listen(3000);