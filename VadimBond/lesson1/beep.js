// Пример с урока

const ansi = require('ansi');
const cursor = ansi(process.stdout);
console.log('beep!');
cursor.beep();