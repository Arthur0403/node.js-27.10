const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const path = require('path');

const db = require('./db');
const tasksController = require('./controllers/tasks');

const app = express();

app.use(
	express.static(
		path.resolve(__dirname, 'public')
	)
);

app.use(bodyParser.json());
app.use(cors());

function identifyUser(req, res, next) {
	if(req.headers.authorization) {
		const [, token] = req.headers.authorization.split(' ');

		jwt.verify(token, 'secretString', function(err, decoded) {
			if(err) {
				return res.status(403).json({ error: 'Wrong token' });
			}

			req.user = decoded;
			next();
		});
	} else {
		res.status(403).json({ error: 'No token present' });
	}
}

app.post('/auth', tasksController.auth);

app.all('/', identifyUser);
app.all('/tasks', identifyUser);
app.all('/tasks*', identifyUser);

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
	app.listen(3000, () => {
		console.log('server express started on port 3000...');
	});
});
