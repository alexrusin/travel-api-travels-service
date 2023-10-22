import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateRequest(schema: ObjectSchema) {
  return async function validator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body) {
      next();
    }
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (error) {
      next(error);
      return;
    }

    next();
  };
}
