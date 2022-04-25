const router = require("express").Router();
const homeRoute = require("./homeRoute");
const userRoute = require("./userRoute");
const topicsRoute = require("./topicsRoute");
const errorRoute = require("./errorRoute");

router.use("/", userRoute, homeRoute, topicsRoute, errorRoute);

module.exports = router;
