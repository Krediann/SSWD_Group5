const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const layouts = require("express-ejs-layouts");
const session = require('express-session');
// importing mongoose for DB
const mongoose = require("mongoose");

//Setting mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://localhost:27017/groupwork_db",
  { useNewUrlParser: true}
);
//mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
// Setting the port for the app
app.set("port", process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Using logger to see the requests from client to server
app.use(logger('dev'));
app.use(express.json());
app.use(layouts);
app.use(express.urlencoded({
   extended: false 
  })
);
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.use("/", router);
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
