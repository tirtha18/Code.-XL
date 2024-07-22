import express from "express";

import { getUser } from "../controllers/getUser.js";

import { cache } from "../middlewares/rediscache.js";

const router4 = express.Router();

router4.get("/getUser", cache, getUser);

export default router4;
