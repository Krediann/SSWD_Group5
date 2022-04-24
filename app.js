const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const layouts = require("express-ejs-layouts");
// Importing controllers
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
// importing mongoose for DB
const mongoose = require("mongoose");
// Router
const router = require('./routes/index');

const app = express();


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
app.use(express.static(path.join(__dirname, 'public')));

// Routes for different views using routers
app.use('/', router);

app.get("/users", userController.getAllUsers);
app.get("/register", userController.getSignInPage);
app.post("/registering", userController.saveUser);

// Using the errorController
app.use(errorController.errorLogger);
app.use(errorController.respondNoResourceFound);
app.use(errorController.responInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
