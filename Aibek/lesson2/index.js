			const fs = require ('fs');
			const readline = require('readline');
			const rl = readline.createInterface({
				input:process.stdin,
				output:process.stdout
			})

			var wins=0
			var losses=0
			var number=0
			async function getNum (){
				return new Promise((resolve,reject) => {
					rl.question('Введите число',(answer)=>
					{
						var b = answer;
						console.log(b);
						resolve(b);
					});
					
				})
			}
			async function commonDoIt(){
				return new Promise(async(resolve,reject) =>{
					var b = await getNum();
					var a = Math.floor(Math.random()*2)+1;
					console.log(a);
					if (a==b){
						console.log('Match!')
						wins++
					}
					else if(b==3){
						resolve (false);
					}
					else {
						console.log('Unlucky :(')
						losses++
					}
					resolve (true)
					})
				
			}
			async function start(){
				for (var x=0;x<=5;x++){

					var c =await commonDoIt()
					console.log(c)
					
					number++
					console.log(wins)
					console.log(losses)
					console.log(number)
				}
				return;
			}
			start();