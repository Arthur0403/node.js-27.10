const random = require('random');
const minimist = require('minimist');
const readline = require('readline');
 
const inputDigit = readline.createInterface({
    input: process.digitin,
    output: process.digitout,
  });
  
  inputDigit.question('Введите число', (answer) => {
    console.log('Вы ввели число', answer);
  });




// Генереруем вариант
const rng = random.int(min = 0, max = 1);
console.log (rng);
