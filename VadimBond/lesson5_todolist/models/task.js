class Task {
	static getAll() {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				if(err) {
					reject(err);
				}
				connection.query('SELECT * FROM `tasks` WHERE 1', (err, rows) => {
					if(err) {
						connection.release();
						reject(err);
					}
					connection.release();
					resolve(rows);
				});
			});
		});
	}

	static add(task) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				if(err) {
					reject(err);
				}

				connection.query(
					'INSERT INTO `tasks` SET ?',
					task,
					(err, result) => {
						if(err) {
							connection.release();
							reject(err);
						}

						connection.release();
						resolve(result.insertId);
					}
				);
			});
		});
	}

	static change() {

	}

	static delete() {

	}

	static complete() {

	}
}

module.exports = Task;
