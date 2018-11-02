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
    //console.log('Нужно выбрать число 1 или 2');

    //console.log('Нужно выбрать число 1 или 2');
    console.log(chalk.white.bgRed(' Нужно выбрать число 1 или 2 \n'));
    
  } else if (isNaN(inputDigit)) {
    console.log('Вы ввели некоректный символ!');
    return;
  } else if (inputDigit == rnd) {
    console.log(chalk.white.bgGreen(' Правильно '));
    trueAnswer++;
    
  } else if (inputDigit !== rnd) {
    console.log(chalk.white.bgRed(' Не угадал! Попробуй еще раз '));
    falseAnswer++;
  }
  
  
  fs.writeFileSync('./log.txt', `Всего попыток - ${games} \n--Угадал: ${trueAnswer} раз. \n--Неугадал: ${falseAnswer} раз. \n--ИТОГ = ${trueAnswer}:${falseAnswer} \n _____________________________`  );
  var fileContent = fs.readFileSync("log.txt", "utf8");
  console.log(fileContent);
  games++;
  console.log('\nВыбери число '+ (chalk.black.bgYellow (' 1 ')) + ' или ' + (chalk.black.bgYellow (' 2 ')));
});









// const stopPlay = (games) => {
//   console.log(chalk.green('Правильно'));
//   rl.question('Продолжим? Да или Нет\n', (answer) => {
//     if (answer == 'нет') {
//       console.log('\n Спасибо за игру!');
//       rl.close();
      
//     } else {
//       console.log('\nВыбери число 1 или 2');
//     }
//   });

//  let nunber = 1;
//  const resNumber = (number) => {
//   number++;
//  };

  
  //return 0;
//};
 