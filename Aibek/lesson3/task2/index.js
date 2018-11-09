const request = require('request');
const http = require('http');
const readline = require('readline');
const rl = readline.createInterface ({
	input: process.stdin,
	output: process.stdout
});
let first = 'ru'
let second = 'en'
pre();
function pre(){
	rl.question('Для перевода с русского на английский введите r, для перевода с английского на русский введите e', (answer)=>{
		if(answer=='r'){
			first = 'ru'
			second = 'en'
			console.log('Введите слово на русском')
			go(first, second)
		} else {
			first = 'en'
			second = 'ru'
			console.log('Введите слово на английском')
			go(first, second);
		}
	})
}


function go(first, second) {
	rl.on('line', (line)=> {
		if (line == 'exit'){
			rl.close();
		} else {
			request('https://translate.yandex.net/api/v1.5/tr.json/translate?lang='+first+'-'+second+'&key=trnsl.1.1.20181108T091223Z.48356d72be3ef058.dea90a0d915b56e74cf9bd4105f7f0d0a770c003&text='+line,
				(err,res)=>{
					if(!err && res.statusCode===200){
						console.log(JSON.parse(res.body).text.toString());
						pre();
					}	else {
						console.error(err);
					}
				})
		}
	})
}


/*application/json ; charset=utf-8*/