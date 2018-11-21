const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');

const db = require('./db');
const tasksController = require('./controllers/tasks');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));


app.get('/', tasksController.getAll);

app.get('/:id', tasksController.getId);

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
