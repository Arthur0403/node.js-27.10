const request = require(`request`);
const readline = require(`readline`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(`Задание №2`);
rl.on(`line`, (line) => {
    if(line == `exit`) {
        rl.close();
    } else if(line == ``){
        console.log(`Введите новое слово или фразу для перевода и нажмите "Enter", для выхода наберите "exit":`);
    } else {
        var trRes = request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181106T135532Z.d96e332dbdb80c82.8fb1ed14b963ecc5ed6309b8e2871764b0fc5d45&text=${line}&lang=en-ru&format=plain`, (err, response, body) => {
            if (!err && response.statusCode == 200){
                console.log(JSON.parse(body).text.toString());
                console.log(`Введите новое слово или фразу для перевода и нажмите "Enter", для выхода наберите "exit":`);
            } else {
                console.error(err)
            }
        });
    }
})
rl.emit(`line`,``);