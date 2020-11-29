const AppError = require('./../utils/AppError');

const castErrorStr = 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.stringValue.replace(/"/g, '')}.`;
  return new AppError(message, 400);
};

const handDuplicateFieldDB = err => {
  const message = `Duplicate field value: '${err.keyValue.name}'. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log Error
    console.error('ERROR 💥', err);

    // 2) Send Generic Message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV.trim() === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };

    if (`${error.reason} `.startsWith(castErrorStr)) error = handleCastErrorDB(error);
    if (error.code === 11000) error = handDuplicateFieldDB(error);
    if (error._message.endsWith('validation failed')) error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};