const express = require(`express`);
const bodyParser = require(`body-parser`);
const consolidate = require(`consolidate`);
const path = require(`path`);
const connection = require(`./connector.js`)
const todoList = require(`./models/todolist`);

const app = express();
const port = 8080;

app.engine(`hbs`, consolidate.handlebars);
app.set(`view engine`, `hbs`);
app.set(`views`, path.resolve(__dirname, `views`));


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(
    path.resolve(__dirname, `public`)
))

app.get(`/`, async (req, res) => {
    const tasks = await todoList.find();
    res.render(`index`, {tasks});
})

app.post(`/`, async (req, res) => {
    let listitem = new todoList({task: req.body.newTask, completed: false});
    listitem = await listitem.save();
    const tasks = await todoList.find();
    res.render(`index`, {tasks});
})

app.post(`/delete`, async(req, res) => {
    const rec = await todoList.findByIdAndRemove(req.body.delete, () => {
        console.log(`Запись ${req.body.delete} была удалена`);
    })
    const tasks = await todoList.find();
    res.render(`index`, {tasks});
})

app.post(`/complete`, async(req, res) => {
    const rec = await todoList.findByIdAndUpdate(req.body.complete, {completed: true} , () => {
        console.log(`Запись ${req.body.complete} была модифицирована`);
    })
    const tasks = await todoList.find();
    res.render(`index`, {tasks});
})

app.listen(port, () => {
    console.log(`Server has been started. Listening port ${port}`);
})