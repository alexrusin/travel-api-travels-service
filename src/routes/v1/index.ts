import express, { Router } from "express";
import travels from "./travels";

const v1: Router = express.Router();

v1.use("/travels", travels);

export default v1;
