const records = [
 { id: 1, username: 'admin', password: 'admin', displayName: 'Дмитрий', emails: [ { value: 'ld@dzertv.ru' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('Пользователь ' + id + ' не существует'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    const user = records.find((record) => record.username === username);
    return cb(null, user);
  });
}