// const AppError = require('../utils/appError');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
}
const sendErrorProd = (err, res) => {
// for operational errors
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }else {
// for programming or other errors so we dont want to leak details to the client    
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  };
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res);
  }else if(process.env.NODE_ENV === 'production'){
    sendErrorProd(err, res);
  }
}; 


// const devError = (res, error) => {
//   console.log('ajajajaj')
//   res.status(error.statusCode).json({
    
//     status: error.status,
//     message: error.message,
//     stackTrace: error.stack,
//     error: error
//   });
// }
// const castErrorHandler = (err) => {
//   const msg = ``
// }
// const prodError = (res, error) => {
//   if(error.isOperational){
//   res.status(error.statusCode).json({
//     status: error.status,
//     message: error.message,
//   });
//  }else{
//   res.status(500).json({
//     status: 'error',
//     message: 'Something Went Very Wrong!'
//   });
//  }
// }

// module.exports = (error, req, res, next)=>{
//     // console.log(error.stack);
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || 'error';
//     if(process.env.NODE_ENV === "production"){
//       console.log('Hi');
      
//       prodError(res, error);
//     } else if(process.env.NODE_ENV === "developer"){
//       devError(res, error);
//     }
//   };