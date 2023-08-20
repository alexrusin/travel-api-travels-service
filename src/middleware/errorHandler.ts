import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || process.env.NODE_ENV === "development") {
    return next(error);
  }

  console.log(error);

  res.status(400).json({
    error: {
      message:
        error.message || "An error occurred. Please view logs for more details",
    },
  });
}
