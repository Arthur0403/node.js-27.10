const ObjectId = require('mongodb').ObjectId;
const db = require('../db');
const cr = require('./crypto');

exports.getAll = (cb) => {
	db.getDB().collection(db.getCollectionName()).find({}).toArray((err, docs) => {
		cb(err, docs);
	});
};

exports.add = (task, cb) => {
	task.name = cr.encrypt(task.name);  //
	task.name += '---' + cr.decrypt(task.name);  //
	db.getDB().collection(db.getCollectionName()).insertOne(task, (err, result) => {
		cb(err, result);
	})
};

exports.change = (id, newData, cb) => {
	db.getDB().collection(db.getCollectionName()).updateOne(
		{ _id: ObjectId(id) },
		{ $set: newData },
		{
			upsert: false,
			multi: false
		},
		function (err, result) {
			cb(err, result);
		}
	);
};

exports.complete = (id, newData, cb) => {
	db.getDB().collection(db.getCollectionName()).update(
		{ _id: ObjectId(id) },
		{ $set: newData },  //
		{
			upsert: false,
			multi: false
		},
		function (err, result) {
			cb(err, result);
		}
	);
};

exports.delete = (id, cb) => {
	db.getDB().collection(db.getCollectionName()).deleteOne(
		{ _id: ObjectId(id) },
		function (err, result) {
			cb(err, result);
		}
	);
};
