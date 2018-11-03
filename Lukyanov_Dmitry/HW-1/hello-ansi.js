 // Использовал пакет ansi повтор лекции
 
 const ansi = require ('ansi');
 const cursor = ansi (process.stdout);
 cursor.beep();
 cursor.green();
 cursor.write('\nHello World!');
 cursor.red();
 cursor.write('\nHello World!');
 cursor.blue();
 cursor.write('\nHello World!\n');
 cursor.white();




