/*
2) Создать переводчик слов с английского на русский, который будет
обрабатывать входящие GET запросы и возвращать ответы,
полученные через API Яндекс.Переводчика.
 */

const request = require('request');
const readline = require('readline');

const myKey = 'trnsl.1.1.20181107T120934Z.c64b5a4b7d56ba8d.531d97fac16dff15098b4182d2fc696486a50c82';
const reqStart = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=';
const reqEnd = '&lang=en-ru&text=';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (input) => {
	if(input === 'q') {
		rl.close();
	} else if(!input) {
			console.log(`Введите слово для перевода или 'q' для выхода`);
	} else {
			translator(input);
	}
});

rl.emit('line', '');

const translator = (word) => {
	const uri = reqStart + myKey + reqEnd + word;
	return request({
		uri: uri,
		followAllRedirects: true,
		method: 'GET',
		json: true
	}, (err, response, body) => {
		if (!err && response.statusCode === 200) {
			console.log(`Перевод на русский язык: ${body.text[0]}`);
		}
	});
};

