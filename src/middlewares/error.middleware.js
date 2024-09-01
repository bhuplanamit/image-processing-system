const {error} = require("../utils/logger");

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.statusCode = 500;
  }
}

function errorHandler(err, req, res, next) {
  error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    status: statusCode,
  });
}

module.exports = {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  errorHandler};