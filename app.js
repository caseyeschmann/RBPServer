// requiring express, dotenv dependency packages
require('dotenv').config();
const express = require('express');

// requirig database
const db = require('./db')

// firing the express function from the express module
const app = express();

// Requiring headers
app.use(require('./middleware/headers'));

const controllers = require('./controllers')

// post this above any routes so our requests will be in JSON format
app.use(express.json());

app.use('/courses', controllers.coursecontroller)


// app.use(require('./middleware/validateStudent'));
app.use('/students', controllers.studentcontroller)


// app.use(require('./middleware/validateEmployee'));
app.use('/employees', controllers.employeecontroller)


app.use('/subscribers', controllers.subscribercontroller)

// app.use('/orders', controllers.ordercontroller)



db.authenticate()
.then(() => db.sync({force:true})) // {force:true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server]: Server Crashed");
    console.error(err)
})