const express = require(`express`);
const cheerio = require(`cheerio`);
const request = require(`request`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const consolidate = require(`consolidate`);
const path = require(`path`);

const app = express();
const port = 8080;

app.engine(`hbs`, consolidate.handlebars);
app.set(`view engine`, `hbs`);
app.set(`views`, path.resolve(__dirname, `views`));

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(
    path.resolve(__dirname, `img`)
))

app.get(`/`, (req, res) => {
    if(req.cookies.formstate){
        res.status(200).type('html').render(`index`,{"features": [], "renderit": false, "formstate": req.cookies.formstate})
    } else {
        res.status(200).type('html').render(`index`,{"features": [], "renderit": false, "formstate": req.query.count||1})
    }    
})

app.post(`/`, (req, res) => {
    request(`https://news.yandex.ru/Tyumen/`, (err, response, body) => {
        if (!err && response.statusCode === 200){
            const $ = cheerio.load(body);
            let data = [];
           $(`.story__title`).slice(0, req.body.count).each(function(){
                data.push($(this).text());
            })
            res.cookie(`formstate`,req.body.count);
            res.status(200).type('html').render(`index`, {"features": data , "renderit": true, "formstate": req.body.count});
        }
    })
})

app.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})