import { NextFunction, Request, Response } from "express";
import Tour from "../../../database/models/Tour";
import TourResource from "../../../resources/TourResource";

export const listTours = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tours = TourResource.collection(await Tour.findAll());
    res.status(200).json({ tours });
  } catch (error: any) {
    next(error);
  }
};

export const getTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tourResource = new TourResource(await Tour.findByPk(req.params.id));
    res.status(200).json({ tour: tourResource.item() });
  } catch (error: any) {
    next(error);
  }
};
