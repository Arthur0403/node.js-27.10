const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

request('https://news.yandex.ru/', (err, response, body) => {
  if (!err && response.statusCode === 200) {
   const $ = cheerio.load(body);
   
   // Количество новостей
   const number = $('.story__title').contents().length;
   console.log (chalk.white.bgRed(` Всего новостей - ${number}  `));
   
   //Вывод новостей
   const news = [];
     $('.story__title').each(function(i) {
     news[i] = (i+1) + '. ' + $(this).text();
   });
   const allNews = news.join('\n');
   console.log(`${allNews}`)
  
  } else {
    console.log (chalk.white.bgRed(' Нет ответа от сервера! '));
  }
});