import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import Joi from "joi";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
  }

  if (Joi.isError(error)) {
    const validationError: ValidationError = {
      error: {
        message: "Validation error",
        code: "ERR_VALID",
        errors: error.details.map((item) => ({
          message: item.message,
        })),
      },
    };
    return res.status(422).json(validationError);
  }

  if (error instanceof ApiError) {
    return res.status(error.status).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
  }

  if (process.env.NODE_ENV === "development") {
    next(error);
  } else {
    if (process.env.NODE_ENV !== "test") {
      console.log(error);
    }

    res.status(400).json({
      error: {
        message:
          error.message ||
          "An error occurred. Please view logs for more details",
      },
    });
  }
}
