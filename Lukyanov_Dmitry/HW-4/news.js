const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const temph = require('consolidate');
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');


const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.engine('hbs', temph.handlebars);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.render('index', {allNews: []});
});
app.post('/allnews', async(req, res) => {
  app.use(bodyParser.urlencoded({extended: false}));
  //
  let outAll = new Promise((out) => {
    const url = 'https://news.yandex.ru/';
    let allNews = [];
    let choice;

    if (!req.body.amount){
      choice = 5
    } else {
      choice = req.body.amount
    };
    //Формирую ссылку
     const link = `${url}${req.body.section || 'index'}.html`;
    
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

  outAll.then((result) => {
    res.render('index', {allNews: result});
  })
});

if (!module.parent) {
  app.listen(8500);
  console.log('Express started on port 8500');
};
