const express = require('express');
const bodyParser = require('body-parser');
const Socket = require('socket.io');

const http = require('http');
const path = require('path');

const db = require('./db');
const tasksController = require('./controllers/tasks');

const app = express();
const server = http.Server(app);
const io = Socket(server);

app.use(
	express.static(
		path.resolve(__dirname, 'public')
	)
);

app.use(bodyParser.json());

io.on('connection', (socket) => {
	console.log(`User ${socket.id.toString().substr(0, 5)} has been connected`);

	socket.on('add_change_delete', () => {
		socket.broadcast.emit('add_change_delete', {});
	});

	socket.on('disconnect', () => {
		console.log(`User ${socket.id.toString().substr(0, 5)} disconnected`);
	});
});

app.get('/tasks', tasksController.getAll);

app.get('/tasks/:id', tasksController.getId);

app.post('/tasks', tasksController.add);

app.put('/tasks/:id', tasksController.change);

app.patch('/tasks/:id', tasksController.complete);

app.delete('/tasks/:id', tasksController.delete);


db.connect('mongodb://localhost/tasks', (err) => {
	if (err) {
		return console.log(err);
	}
	server.listen(3000, () => {
		console.log('server started on port 3000...');
	});
});
