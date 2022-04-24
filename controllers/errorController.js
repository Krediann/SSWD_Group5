const { StatusCodes } = require("http-status-codes");
const httpStatus = require("http-status-codes");

exports.errorLogger = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
;}

exports.respondNoResourceFound = (req, res) => {
    let errorCode = StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist!`);
};

exports.responInternalError = (error, req, res, next) => {
    let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occured: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};