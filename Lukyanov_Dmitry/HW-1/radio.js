// Интернет радио данные стрима

const internetradio = require('node-internet-radio');
const chalk = require('chalk');

// Принимаю поток даннах интернет радио
console.log(chalk.red('Поток интернет радио:'));
const stream = "http://audio2.video.ria.ru:80/voicerus";
internetradio.getStationInfo(stream, function(error, station) {
 console.log(station);
});