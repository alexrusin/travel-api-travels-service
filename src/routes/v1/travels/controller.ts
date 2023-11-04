import { NextFunction, Request, Response } from "express";
import Travel from "../../../database/models/Travel";
import TravelResource from "../../../resources/TravelResource";
import Tour from "../../../database/models/Tour";
import TravelRepository from "../../../repositories/TravelRepository";

export const listTravels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TravelRepository();
    const travels = TravelResource.collection(await repository.getAll());
    res.status(200).json({ travels });
  } catch (error: any) {
    next(error);
  }
};

export const getTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TravelRepository();
    const travelResource = new TravelResource(
      await repository.getById(req.params.id)
    );
    res.status(200).json({ travel: travelResource.item() });
  } catch (error: any) {
    next(error);
  }
};

export const createTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TravelRepository();
    const travelResource = new TravelResource(
      await repository.create(req.body)
    );
    res.status(201).json({ travel: travelResource.item() });
  } catch (error) {
    next(error);
  }
};

export const updateTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TravelRepository();
    const travelResource = new TravelResource(
      await repository.update(req.params.id, req.body)
    );
    res.status(200).json({ travel: travelResource.item() });
  } catch (error) {
    next(error);
  }
};

export const deleteTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = new TravelRepository();
    await repository.delete(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
