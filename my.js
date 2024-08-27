const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(globalErrorHandler); // function moved to controllers/errorController.js

// const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));


  module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500; // internal server error
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }