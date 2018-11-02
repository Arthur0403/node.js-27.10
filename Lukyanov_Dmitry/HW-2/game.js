const readline = require('readline');
const fs = require('fs');
const random = require('random');
const chalk = require('chalk');



let games = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('Выбери число 1 или 2');


rl.on('line', (inputDigit) => {
  const rnd = random.int(1, 2);
  console.log ('PC=' ,rnd);


  if (inputDigit > 2 || inputDigit < 1) {
    console.log('Нужно выбрать число 1 или 2');
  } else if (isNaN(inputDigit)) {
    console.log('Вы ввели некоректный символ!');
  } else if (inputDigit == rnd) {
    games = stopPlay(games, games);
  } else if (inputDigit !== rnd) {
    console.log(chalk.white.bgRed(' Неугадал \n'));
    console.log(chalk.red('Попробуй еще раз'));
  }

  games++;
});


const stopPlay = (games) => {
  console.log(chalk.green('Правильно'));
  rl.question('Продолжим? Да или Нет\n', (answer) => {
    if (answer.toLowerCase() == 'нет'.toLowerCase()) {
      console.log('\n Спасибо за игру!');
      rl.close();
      
    } else {
      console.log('\nВыбери число 1 или 2');
    }
  });

 let nunber = 1;
 const resNumber = (number) => {
  number++;
 };

  fs.appendFileSync('./log.txt', `\n№${resNumber()}: Игра ${games}` );
  return 0;
};
 