const ObjectId = require('mongodb').ObjectId;
const db = require('../db');

exports.getAll = (cb) => {
	db.getDB().collection(db.getCollectionName()).find({}).toArray((err, docs) => {
		cb(err, docs);
	});
};

exports.getId = (id, cb) => {
	db.getDB().collection(db.getCollectionName()).findOne({ _id: ObjectId(id) }, (err, doc) => {
		cb(err, doc);
	});
};

exports.add = (task, cb) => {
	db.getDB().collection(db.getCollectionName()).insertOne(task, (err, result) => {
		cb(err, result, task);
	})
};

exports.change = (id, newData, cb) => {
	db.getDB().collection(db.getCollectionName()).updateOne(
		{ _id: ObjectId(id) },
		{ $set: newData },
		{
			upsert: false,
			multi: false,
		},
		function (err, result) {
			db.getDB().collection(db.getCollectionName()).findOne({ _id: ObjectId(id) }, (err, doc) => {
				cb(err, result, doc);
			});
		}
	);
};

exports.complete = (id, newData, cb) => {
	db.getDB().collection(db.getCollectionName()).updateOne(
		{ _id: ObjectId(id) },
		{ $set: newData },  //
		{
			upsert: false,
			multi: false
		},
		function (err, result) {
			db.getDB().collection(db.getCollectionName()).findOne({ _id: ObjectId(id) }, (err, doc) => {
				cb(err, result, doc);
			});
		}
	);
};

exports.delete = (id, cb) => {
	db.getDB().collection(db.getCollectionName()).findOneAndDelete(
		{ _id: ObjectId(id) },
		function (err, result) {
			cb(err, result);
		}
	);
};
