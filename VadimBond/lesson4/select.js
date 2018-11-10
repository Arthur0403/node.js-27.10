const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const hbs = require('hbs');
const path = require('path');

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true});

hbs.registerHelper('createStringNews', function(array) {
	let result = '';
	for(let i = 0; i < array.length; i++) {
		result += '<li>' + array[i] + '</li>';
	}
	return new hbs.SafeString('<ul>' + result + '</ul>');
});

app.use(
	express.static(
		path.resolve(__dirname, 'public')
	)
);

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.post('/news', urlencodedParser, function (req, res) {
	if(!req.body) return res.sendStatus(400);
	const nw = {
		sport: ['sp0', 'sp1', 'sp2', 'sp3', 'sp4', 'sp5'],
		politics: ['po0', 'po1', 'po2', 'po3', 'po4', 'po5'],
		weather: ['we0', 'we1', 'we2', 'we3', 'we4', 'we5']
	};
	const array = nw[req.body.news];
	array.length = +req.body.num;
	res.render('news.hbs', {
		ar: array
	});
});

app.get('/', (req, res) => {
	res.send(`<h2>Lesson4</h2>`);
});

app.listen(3000);


