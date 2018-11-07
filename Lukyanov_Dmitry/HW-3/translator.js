const request = require('request');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите текст (RU):', (textIn) =>{
    textTrans(textIn);
    rl.close(); 
    }
);

const textTrans = (textInput) => {
   key = 'trnsl.1.1.20181106T083457Z.87ac33d9ca391bbb.610e70224699c3872400711cb6f4dc812ca6ebe1';
   url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
   lang = 'ru-en';

  request(url, {form: {key: key, text: textInput, lang: lang}},
  (err, res, body) => {
    if(!err && res.statusCode === 200) {
        console.log(chalk.white.bgRed (` Перевод(EN):${JSON.parse(body).text[0]} `));
    } else {
        console.log(chalk.white.bgRed(' Произошла ошибка при выполнении запроса '));
    }
  });
};