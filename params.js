const urlutils = require('url');

const url = 'http://user:password@geekbrains.ru:8888/users/men/1?query=string#hash';

const paramsObj = urlutils.parse(url, true);
delete paramsObj.search;
paramsObj.query = {
  key: 'value',
  id: 10,
  name: 'Vasya',
}

console.log(urlutils.format(paramsObj))