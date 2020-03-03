/* Libraries */
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('../config.json');

/* Singleton */
const app = express();

/* Database */
mongoose.connect("mongodb://localhost/nodebin")
	.then(() => console.log("Database connected!"))
	.catch(() => console.log("Error connecting to database"));

/* Settings */
app.set("port", config.defaultPort);

/* Middlewares*/
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

/* Routes */
app.use("/api", require('./routes/api.js'));
app.use("/", require('./routes/main.js'));

/* Listening */
app.listen(app.get("port"), () => {
	console.log(`Server listening on 127.0.0.1:${app.get("port")}`);
})