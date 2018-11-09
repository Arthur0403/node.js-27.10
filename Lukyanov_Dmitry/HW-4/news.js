const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const temph = require("consolidate");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.engine('hbs', temph.handlebars);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.render('index', {allNews: []});
});

app.post('/allnews', function (req, res) {
  app.use(bodyParser.urlencoded({extended: false}));
  //
  let prom = new Promise((out) => {
    let url = 'https://news.yandex.ru/';
    let allNews = [];
    let choice
    if (req.body.amount == null) {
      choice = 5
    } else {
      choice = req.body.amount
    };
    //Формирую ссылку
    if (req.body.answer === 'index') {
      link = url + 'index.html';
    } else if (req.body.section === 'business') {
      link = url + 'business.html';
    } else if (req.body.section === 'society') {
      link = url + 'society.html';
    } else if (req.body.section === 'politics') {
      link = url + 'politics.html';
    } else if (req.body.section === 'world') {
      link = url + 'world.html';
    } else if (req.body.section === null) {
      link = url + 'index.html';
    };
    //Запрос
    request(link, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body);
        $(".story__title").each((i, item) => {
          if (i < choice) {
            allNews.push($(item).text());
            console.log(allNews)
          }
        });
        out(allNews);
      }
    });

  });
  prom.then((result) => {
    res.render('index', {allNews: result});
  })
});

if (!module.parent) {
  app.listen(8500);
  console.log('Express started on port 8500');
};