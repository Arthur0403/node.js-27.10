/*
2) Сделать программу-анализатор игровых логов. В качестве
аргумента программа получает путь к файлу. Выведите игровую
статистику: общее количество партий, количество выигранных /
проигранных партий и их соотношение, максимальное число побед /
проигрышей подряд.
 */

var fs = require('fs');
const minimist = require('minimist');
const colors = require('colors/safe');

const args = minimist(process.argv.slice(2));
const log = args._[0];

let total = 0;
let win = 0;
let loss = 0;
/*let maxWinSeq = 0;
let maxLossSeq = 0;*/

fs.readFile(log, function (err, logData) {
	if (err) throw err;

	var text = logData.toString();
	var results = {};

	var lines = text.split('\n');

	lines.forEach( (line) => {
		if (line !== '') {
			if (line === 'true') {
				win++;
			} else {
				loss++;
			}
			total++;
		}
	});

	/*for(let i = 0, w = 0, l = 0; i < lines.length; i++) {
		if(lines[i] === lines[i+1] ) {

		}
	}*/
	console.log(colors.blue(`общее количество партий ${total}`));
	console.log(colors.green(`количество выигранных ${win}`));
	console.log(colors.red(`проигранных партий ${loss}`));
	console.log(colors.bgRed(`соотношение проигранных ${loss/total*100} % `));
	console.log(colors.bgGreen(`соотношение выигранных ${win/total*100} % `));

});