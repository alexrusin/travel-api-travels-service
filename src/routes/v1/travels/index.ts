import express, { Router } from "express";
import {
  listTravels,
  getTravel,
  createTravel,
  updateTravel,
  deleteTravel,
} from "./controller";
import validateRequest from "../../../middleware/validateRequest";
import {
  createTravelSchema,
  updateTravelSchema,
} from "../../../middleware/requestSchemas";

const travels: Router = express.Router();

travels.get("/", listTravels);
travels.get("/:id", getTravel);
travels.post("/", validateRequest(createTravelSchema), createTravel);
travels.put("/:id", validateRequest(updateTravelSchema), updateTravel);
travels.delete("/:id", deleteTravel);

export default travels;
