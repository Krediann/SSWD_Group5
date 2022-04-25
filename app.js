const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const layouts = require("express-ejs-layouts");
const session = require('express-session');
// Importing controllers
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const topicController = require("./controllers/topicController");
// importing mongoose for DB
const mongoose = require("mongoose");
// Router for index
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

//app.use(session());

// Routes for different views using routers
app.use('/', router);
// Routes for seeing all users, register page and the post for actually registering
app.get("/users", userController.getAllUsers, userController.usersView);
app.get("/register", userController.getSignInPage);
app.get("/thanks", userController.thanks)
app.post("/registering", userController.saveUser, userController.redirectView);

// Route for the topics
app.get("/newtopics", topicController.newtopicView);
app.get("/topics", topicController.getAllTopics, topicController.topics);
app.post("/savingTopics", topicController.saveTopic, topicController.redirectView);
app.get("/topics:id", topicController.show, topicController.showView);
// Using the errorController
app.use(errorController.errorLogger);
app.use(errorController.respondNoResourceFound);
app.use(errorController.responInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
