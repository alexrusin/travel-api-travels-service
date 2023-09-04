import express, { Router } from "express";
import travels from "./travels";
import tours from "./tours";

const v1: Router = express.Router();

v1.use("/travels", travels);
v1.use("/tours", tours);

export default v1;
