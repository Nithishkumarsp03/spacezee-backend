import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError.js";
import config from "../config.js";
import handleValidationError from "../errors/handleValidationError.js";
import handleCastError from "../errors/handleCastError.js";
import handleDuplicateError from "../errors/handleDuplicateError.js";
import AppError from "../errors/AppError.js";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "oops something went wrong";
  let errorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err instanceof AppError) {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
    statusCode = err?.statusCode;
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.app_env === "Development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
