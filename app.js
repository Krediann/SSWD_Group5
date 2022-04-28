const createError = require('http-errors'),
  express = require('express'),
  app = express(),
  path = require('path'),
  router = require('./routes/index'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  layouts = require("express-ejs-layouts"),
  session = require('express-session'),
  methodOverride = require("method-override"),
  expressValidator= require('express-validator'),
  connectFlash = require("connect-flash"),
  passport = require("passport"),
  User = require("./models/user"),
  mongoose = require("mongoose");

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

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

// Using logger to see the requests from client to server
app.use(logger('dev'));
app.use(express.json());
app.use(layouts);
app.use(express.static(__dirname +"/public"));
app.use(expressValidator());
app.use(express.urlencoded({
   extended: false 
  })
);
app.use(cookieParser("secretLearningLogasd"));
app.use(
  session({
    secret: "secretLearningLogasd",
    cookie: {
      maxAge: 5000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
app.use("/", router);
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
