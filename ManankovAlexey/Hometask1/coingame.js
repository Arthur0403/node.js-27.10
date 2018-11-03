const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {})
const readline = require('readline');
const fs = require('fs');

const iface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var i = 1;//каунтер
var logs = {
    trys:[]
} //обьект для храннения логов

function throwup(){
    var coinresult = Math.random();
    if (coinresult>0.5){
        return "1" //Орел
    } else {
        return "2" //Решко
    }
}

if(args.file){
    console.log(`Игра началась!`);
    iface.on('line', (line)=>{
        if (line == "exit"){
            iface.close()
        } else if (line == "1"||line =="2"){
            var j = throwup()
            console.log(`Результат подброса ${j}`)
            if(line == j){
                console.log("Поздравляю, вы угодали!")
                logs.trys.push({"try_no":i,"throw_res":j,"result":"success"});
                iface.emit('line', "")
            } else {
                console.log("Сожалею вы не угодали");
                logs.trys.push({"try_no":i,"throw_res":j,"result":"failed"});
                iface.emit('line', "")
            }
            i++;
        } else if (line == ""||undefined){
            console.log(`Попытка №${i}:Орел(1) или решко(2)?, для выхода "exit"`);
        }
    })
    iface.on('close',()=>{
        fs.writeFile(args.file,JSON.stringify(logs),(err)=>{
            if(err) throw err;
        })
    })
    iface.emit('line', "")
} else {
    console.log(`Укажите файл для ведения логов через опцию '--file'`);
}