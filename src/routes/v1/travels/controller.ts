import { NextFunction, Request, Response } from "express";
import Travel from "../../../database/models/Travel";
import TravelResource from "./TravelResource";

export const listTravels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const travels = TravelResource.collection(await Travel.findAll());
    res.status(200).json({ travels });
  } catch (error: any) {
    next(error);
  }
};
