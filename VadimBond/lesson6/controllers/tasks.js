const Tasks = require('../models/tasks');

exports.getAll = (req, res) => {
	Tasks.getAll((err, docs) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.render('index', {docs});
	})
};

exports.add = (req, res) => {
	const newTask = {
		name: req.body.name,
		completed: false,
	};
	Tasks.add(newTask, (err, result) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.redirect('/tasks');
	})
};

exports.change = (req, res) => {
	Tasks.change(req.params.id, { name: req.body.name }, (err, result) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.redirect('/tasks');
	})
};

exports.complete = (req, res) => {
	Tasks.change(req.params.id, { completed: true }, (err, result) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.redirect('/tasks');
	})
};

exports.delete = (req, res) => {
	Tasks.delete(req.params.id, (err, result) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.redirect('/tasks');
	})
};
