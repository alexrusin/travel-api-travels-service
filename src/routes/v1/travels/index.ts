import express, { Router } from "express";
import { listTravels, getTravel } from "./controller";

const travels: Router = express.Router();

travels.get("/", listTravels);
travels.get("/:id", getTravel);

export default travels;
