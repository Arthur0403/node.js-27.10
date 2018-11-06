const request = require(`request`);
const cheerio = require(`cheerio`);

request(`https://news.yandex.ru/Tyumen/`, (err, response, body) => {
    if (!err && response.statusCode == 200){
        const $ = cheerio.load(body);

        for(let i = 0; i < $(`.story__title`).length; i++){
            console.log(`${i+1}) ${$('.story__title').eq(i).text()}\n`)
        }
    }
})