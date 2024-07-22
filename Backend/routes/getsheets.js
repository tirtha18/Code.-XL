import express from "express";
import { getSheets } from "../controllers/getSheets.js";
import { cache } from "../middlewares/rediscache.js";
const router3 = express.Router();

router3.get("/getSheets", cache, getSheets);

export default router3;
