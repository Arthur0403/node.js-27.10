const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

request('https://news.yandex.ru/', (err, response, body) => {
  if (!err && response.statusCode === 200) {
   const $ = cheerio.load(body);
   console.log(chalk.white.bgRed(' Яндекс Новости '));
   for (i = 0; i < 10; i++) {
 console.log('-',  $('.story__title').eq(i).text() + '.');
   }
  }
});