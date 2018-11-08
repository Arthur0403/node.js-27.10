const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.get('/',(req, res)=>{
    fs.readFile(`index.html`,(err, data)=>{
        if(err) throw err;
        console.log(data.toString());
        res.set('Content-Type', 'text/html');
        res.end(data);
    });
    
})

app.listen(port, ()=>{
    console.log(`Server has been started. Listening port ${port}`);
})