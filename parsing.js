const request = require('request');
const cheerio = require('cheerio');

request('https://www.rbc.ru/', (err, response, body) => {
  if (!err && response.statusCode === 200) {
    const $ = cheerio.load(body);

    console.log('Курс доллара:', $('.indicators__ticker__val1').eq(0).text());
  }
})