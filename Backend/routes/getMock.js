import express from "express";

import { getMock } from "../controllers/getMock.js";

const router6 = express.Router();

router6.get("/getMock", getMock);

export default router6;
