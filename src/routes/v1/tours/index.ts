import express, { Router } from "express";
import { listTours, getTour } from "./controller";

const tours: Router = express.Router();

tours.get("/", listTours);
tours.get("/:id", getTour);

export default tours;
