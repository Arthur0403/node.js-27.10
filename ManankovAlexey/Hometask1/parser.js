const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {})
const fs = require('fs');

if(args.file){
    
    fs.readFile(args.file, (err,data)=>{
        if(err){
            throw err;
        } else {
            var parsed_data = JSON.parse(data);
            console.log(`Общее количество партий: ${parsed_data.trys.length}`);

            var suc = 0;
            parsed_data.trys.forEach(element => {
                if(element.result == "success"){
                    suc++;
                }
            });
            console.log(`Количество выйгранных партий: ${suc}`);
            console.log(`Количество проигранных партий: ${parsed_data.trys.length - suc}`);
            console.log(`Соотношение партий: ${suc}/${parsed_data.trys.length - suc}`)

            var max_suc = 0;
            suc = 0;
            var fail = 0;
            var max_fail = 0;
            parsed_data.trys.forEach(element => {
                if(element.result == "success"){
                    if (fail>max_fail){
                        max_fail = fail;
                    }
                    fail = 0;
                    suc++;
                } else if(element.result == "failed"){
                    if (suc>max_suc){
                        max_suc = suc;
                    }                    
                    suc = 0;
                    fail++
                }
            });
            console.log(`Максимальное количество побед подряд: ${max_suc}, максимальное количество поражений подряд: ${max_fail}`);
        }

    })

}