/*
2) Создать простейшую консольную программу с использованием хотя
бы одной функции из стороннего модуля, локально установленного
с помощью NPM (модуль должен отличаться от рассмотренного на
уроке!).
 */

const os = require('os');
const time = require('./my_modules/time');

const userName = os.userInfo().username;
console.log(`Дата запроса: ${time.date}`);
console.log(time.getGreeting(userName));