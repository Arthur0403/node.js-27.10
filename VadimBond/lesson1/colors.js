/*
3) Продвинутый блок: создать с помощью Node.js API консольную
программу, которая будет выводить что-либо в консоль разными
цветами и издавать звук(и) с помощью модуля или модулей,
отличных от рассмотренного на уроке.
 */

const colors = require('colors/safe');

const name = 'Vadim';

console.log(`Hello ${name}`);  // normal
console.log(colors.green(`Hello ${name}`)); // green
console.log(colors.red.underline(`Hello ${name}`));  // red underlined
console.log(colors.rainbow(`Hello ${name}`)); // rainbow
console.log(colors.blue('Hello '), name);  // Hello - blue, name - normal
