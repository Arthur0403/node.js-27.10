const mongoose = require(`mongoose`);

mongoose.connect(`mongodb://localhost/todolist`)

// const db = mongoose.connection;
// db.on(`error`, console.error.bind(console, `connection error:`));
// db.once('open', console.log(`Connection successful`));