const readline = require('readline');
const fs = require('fs');
const random = require('random');
const chalk = require('chalk');

let games = 1;
let trueAnswer = 0;
let falseAnswer = 0;

fs.writeFileSync('./log.txt', `\nИгра ${games}` );
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('\nВыбери число '+ (chalk.black.bgYellow (' 1 ')) + ' или ' + (chalk.black.bgYellow (' 2 ')));


rl.on('line', (inputDigit) => {
  const rnd = random.int(1, 2);
  console.log('Ты выбрал:', inputDigit);
  console.log ('Компьютер загадал:' ,rnd);


  if (inputDigit > 2 || inputDigit < 1) {
    console.log(chalk.white.bgRed(' Нужно выбрать число 1 или 2 '));
    
  } else if (isNaN(inputDigit)) {
    console.log(chalk.white.bgRed(' Ты выбрал не число! Нужно выбрать число 1 или 2 '));
    
  } else if (inputDigit == rnd) {
    console.log(chalk.white.bgGreen(' Угадал! Молодец '));
    trueAnswer++;
    
  } else if (inputDigit !== rnd) {
    console.log(chalk.white.bgRed(' Не угадал! Попробуй еще раз '));
    falseAnswer++;
  }
  
  
  fs.writeFileSync('./log.txt', chalk.yellow(`--------------------\nВсего попыток - ${games} \n--Угадал: ${trueAnswer} раз. \n--Неугадал: ${falseAnswer} раз. \n--ИТОГ-- ${trueAnswer}:${falseAnswer} \n--------------------`  ));
  var fileContent = fs.readFileSync("log.txt", "utf8");
  console.log(fileContent);
  games++;
  console.log('\nПродолжим \nВыбери число '+ (chalk.black.bgYellow (' 1 ')) + ' или ' + (chalk.black.bgYellow (' 2 ')));
});

