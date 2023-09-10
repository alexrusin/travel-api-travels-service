import { NextFunction, Request, Response } from "express";
import Travel from "../../../database/models/Travel";
import TravelResource from "../../../resources/TravelResource";
import Tour from "../../../database/models/Tour";

export const listTravels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const travels = TravelResource.collection(
      await Travel.findAll({
        include: Tour,
      })
    );
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
    const travelResource = new TravelResource(
      await Travel.findByPk(req.params.id, {
        include: Tour,
      })
    );
    res.status(200).json({ travel: travelResource.item() });
  } catch (error: any) {
    next(error);
  }
};
