			const fs = require ('fs');
			const readline = require('readline');
			const rl = readline.createInterface({
				input:process.stdin,
				output:process.stdout
			})

			var a
			var b
			var wins=0
			var losses=0
			var number=0
			while (true){
				rl.question('Введите число от 1 до 2',(answer)=>
					{
						b = answer
					});
				console.log(b)
				a = Math.floor(Math.random()*2)+1;
				console.log(a);
				if (a==b){
					console.log('Match!')
					wins++
				}
				else if (b==3){
					break
				}
				else {
					console.log('Unlucky :(')
					losses++
				}
			}
			number++
			console.log(wins)
			console.log(losses)
			console.log(number)