const router = require("express").Router();
const homeRoute = require("./homeRoute")

router.use("/", homeRoute);

module.exports = router;
