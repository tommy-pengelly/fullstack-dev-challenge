import express from "express";
import { getCalculation } from "../api/CalculatorController";

const router = express.Router();

router.get("/", getCalculation);

export default router;
