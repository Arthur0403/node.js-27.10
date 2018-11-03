// RSS парсер lenta.ru
const Parser = require('rss-parser');
const chalk = require('chalk');

let parser = new Parser();
 
(async () => {
 
  let feed = await parser.parseURL('https://lenta.ru/rss/news');
  console.log(feed.title);
 
  feed.items.forEach(item => {
      
        console.log(chalk.red.bold(item.title) + ':' + chalk.black.bgBlueBright(item.link))
    
  });
 
})();
