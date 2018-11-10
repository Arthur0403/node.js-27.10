/*
1) Создать программу для получения информации о последних
новостей с выбранного вами сайта в структурированном виде.
 */

const request = require('request');
const cheerio = require('cheerio');

request('http://www.norway.mid.ru/ru/index.html', (err, res, body) => {
	if (!err && res.statusCode === 200) {
		const $ = cheerio.load(body);

		$('.frontpagetable tr').each( function(i, el) {
			const th = $(this).find('th').text();
			const a = $(this).find('a').text();

			console.log(`${th} -- ${a}`);
		});
	}
});