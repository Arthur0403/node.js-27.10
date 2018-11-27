
const Tasks = require('../models/tasks');

exports.getAll = (req, res) => {
	Tasks.getAll((err, docs) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};

exports.getId = (req, res) => {
	Tasks.getId(req.params.id, (err, doc) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(doc);
	})
};

exports.add = (req, res) => {
	const newTask = {
		name: req.body.name,
		completed: false,
	};
	Tasks.add(newTask, (err, result, task) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(task);
	})
};

exports.change = (req, res) => {
	Tasks.change(req.params.id, { name: req.body.name }, (err, result, task) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(task);
	})
};

exports.complete = (req, res) => {
	Tasks.change(req.params.id, { completed: req.body.completed }, (err, result, task) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(task);
	})
};

exports.delete = (req, res) => {
	Tasks.delete(req.params.id, (err, result) => {
		if (err) {
			return res.sendStatus(500);
		}
		res.send(result.value);
	})
};
