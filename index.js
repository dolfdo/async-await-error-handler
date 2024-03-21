class OperationalError extends Error {
  constructor(message) {
    super(message);
    this.name = "OperationalError";
    this.isOperational = true;
  }
}

class ProgrammerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProgrammerError";
    this.isOperational = false;
  }
}

const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = err.isOperational ? 400 : 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      type: err.name,
      status: statusCode,
    },
  });
};

const errorHandlerWithLogging = (err, req, res, next, logger = console.error) => {
  logger(err);
  defaultErrorHandler(err, req, res, next);
};

const catchErrors = (fn, errorHandler = defaultErrorHandler) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => errorHandler(err, req, res, next));
  };
};

const asyncHandler = (fn, errorHandler = defaultErrorHandler) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => errorHandler(err, req, res, next));
  };
};

module.exports = {
  catchErrors,
  asyncHandler,
  OperationalError,
  ProgrammerError,
  defaultErrorHandler,
  errorHandlerWithLogging,
};
