const MongoClient = require('mongodb').MongoClient;

const state = {
	db: null,
	collectionName: 'tasks',
};

exports.connect = (url, done) => {
	if (state.db) {
		return done();
	}
	MongoClient.connect(url, (err, db) => {
		if (err) {
			return done(err);
		}
		state.db = db.db(state.collectionName);
		done();
	})
};

exports.getDB = () => {
	return state.db;
};

exports.getCollectionName = () => {
	return state.collectionName;
};
