import express from "express";

import { getSheets } from "../controllers/getSheets.js";

const router3 = express.Router();

router3.get("/getSheets", getSheets);

export default router3;
