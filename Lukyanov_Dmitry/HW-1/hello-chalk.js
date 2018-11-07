//  Использовал пакеты chalk игра с цветом математические вычисление
const chalk = require('chalk');

//Изменение цвета
console.log(`
1: ${chalk.red('Hello world!')}
2: ${chalk.green('Hello world!')}
3: ${chalk.yellow('Hello world!')}
`);

console.log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Арифметика и изменение цвета
const a = 10;
const b = 15;
const calculateFeet = a => a + b;
 
console.log(chalk`
  {green.bold A = 10}, {red.bold B = 15}
  Сумма чисел {bold ${a} + ${b}} = {bgRed  ${calculateFeet(a)} }
`);