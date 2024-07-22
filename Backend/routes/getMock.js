import express from "express";

import { getMock } from "../controllers/getMock.js";

import { cache } from "../middlewares/rediscache.js";
const router6 = express.Router();

router6.get("/getMock", cache, getMock);

export default router6;
