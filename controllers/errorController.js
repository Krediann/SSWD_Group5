// Importing statuscodes
const { StatusCodes } = require("http-status-codes");

// Export error handling middleware (logs errors to console)
exports.errorLogger = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
;}

// Errorhandler for the case 404 page not found (it doesn't exist, or the routing is bad :D)
exports.respondNoResourceFound = (error, req, res, next) => {
    let errorCode = StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist!`);
    next();
};
// Errorhandler for the case 500 where the page is found but isn't working for some reason
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occured: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
    next();
};