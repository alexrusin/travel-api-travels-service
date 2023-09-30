import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
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
