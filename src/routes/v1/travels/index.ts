import express, { Router } from "express";
import { listTravels } from "./controller";

const travels: Router = express.Router();

travels.get("/", listTravels);

export default travels;
