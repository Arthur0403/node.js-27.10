/*
	1) Написать консольную игру "Орел или решка", в которой надо будет
угадывать выпадающее число (1 или 2). В качестве аргумента
программа может принимать имя файла для логирования
результатов каждой партии. В качестве более продвинутой версии
задания можете реализовать простейшую версию игры Blackjack.
*/

const minimist = require('minimist');
const colors = require('colors/safe');
const readline = require('readline');
const fs = require('fs');

const args = minimist(process.argv.slice(2));
console.log(colors.yellow(args));
const log = args._[0];
console.log(colors.yellow(log));

/*const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});*/

function createInterface() {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
}

let coinToss = function () {   //  1 - heads and 2 - tails
	return (Math.round(Math.random() + 1));
};

const headsOrTails = function() {
	/*fs.unlink(log, (err) => {
		if (err) throw err;
		console.log('successfully deleted /tmp/hello');
	});*/
	var isGame = 3;
	while(isGame < 9) {
		let rl = createInterface();
		rl.question('Бросаем монетку? ДА-любая клавиша; НЕТ-n  ', (answer) => {
			if (answer === 'n') {
				isGame = 10;
				rl.close();
			} else {
				rl.close();
				const res = coinToss();
				let rl1 = createInterface();
				rl1.question('Ваш выбор: орел или решка? 1-орел; 2-решка  ', (ans) => {
					const compare = (res === +ans);
					fs.appendFile(log, compare + '\n', 'utf8', (err) => {
						if (err) throw err;
						console.log(compare + '');
					});

					if (compare) {
						console.log('Да, угадали!');
						rl1.close();
					} else {
						console.log('НЕТ, увы...');
						rl1.close();
					}

				});
			}

		});
		isGame++;
	}


};

headsOrTails();