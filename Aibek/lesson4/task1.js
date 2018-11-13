const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
// подключение экспресса, регистрация боди парсера
const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'))

// логика
let cat
let array = [];
let a = 3;

app.get(`/form`, (req,res)=>{
	res.status(200).type('html').render(`form`,{
		"features":[]
	})
})
app.post('/form', (req,res)=> {
	cat = req.body.category
	a = req.body.number
	console.log(req.body);
	console.log(cat);
	console.log(a);

	if(cat==='p'){
		request('https://ria.ru/politics/', (err, resp, body) => {
			if (!err && resp.statusCode === 200){
				const $ = cheerio.load(body);
				for(let i=0;i<=(a-1);i++)
					array.push($('.b-list__item').eq(i).text());
				console.log(array);
				res.render(`form`,{
					"features":array
				})
  		}
		});
	} else if (cat==='e') {
		request('https://ria.ru/economy/', (err, resp, body) => {
			if (!err && resp.statusCode === 200){
				const $ = cheerio.load(body);
				for(let i=0;i<=(a-1);i++)
					array.push($('.b-list__item').eq(i).text());
  				console.log(array);
  				res.render(`form`,{
					"features":array
  		})
  		}
		});
	} else if (cat==='s'){
		request('https://ria.ru/society/', (err, resp, body) => {
			if (!err && resp.statusCode === 200){
				const $ = cheerio.load(body);
				for(let i=0;i<=(a-1);i++)
					array.push($('.b-list__item').eq(i).text());
  				console.log(array);
  				res.render(`form`,{
					"features":array
  		})
  		}
		});
	}

	
})
app.listen(8888);

/*		
		array.forEach( function(item, i) {
			res.write(item);
		});
		res.end()
	})*/





/*
let array = [];
let a = 3;
//категория политика
request('https://ria.ru/politics/', (err, res, body) => {
  if (!err && res.statusCode === 200){
  	const $ = cheerio.load(body);
  	for(let i=0;i<=(a-1);i++)
  	array.push($('.b-list__item').eq(i).text());
  	console.log(array);
  }
});

//категория экономика
request('https://ria.ru/economy/', (err, res, body) => {
  if (!err && res.statusCode === 200){
  	const $ = cheerio.load(body);
  	console.log('Новости ', $('.b-list__item').eq(0).html());
  }
});

//категори общество
request('https://ria.ru/society/', (err, res, body) => {
  if (!err && res.statusCode === 200){
  	const $ = cheerio.load(body);
  	console.log('Новости ', $('.b-list__item').eq(0).html());
  }
});
*/