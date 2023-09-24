import { NextFunction, Request, Response } from "express";
import Tour from "../../../database/models/Tour";
import TourResource from "../../../resources/TourResource";
import TourRepository from "../../../repositories/TourRepository";

export const listTours = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TourRepository();
    const tours = TourResource.collection(await repository.getAll());
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
    const repository = new TourRepository();
    const tourResource = new TourResource(
      await repository.getById(req.params.id)
    );
    res.status(200).json({ tour: tourResource.item() });
  } catch (error: any) {
    next(error);
  }
};
