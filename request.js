const request = require('request');

request({
  uri: 'http://geekbrains.ru',
  followAllRedirects: true,
  method: 'GET',
  json: true
}, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    console.log(body);
  }
});