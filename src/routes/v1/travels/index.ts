import express, { Router } from "express";
import { listTravels, getTravel, createTravel } from "./controller";
import validateRequest from "../../../middleware/validateRequest";
import { createTravelSchema } from "../../../middleware/requestSchemas";

const travels: Router = express.Router();

travels.get("/", listTravels);
travels.get("/:id", getTravel);
travels.post("/", validateRequest(createTravelSchema), createTravel);

export default travels;
