import express from "express";

import { getUser } from "../controllers/getUser.js";

const router4 = express.Router();

router4.get("/getUser", getUser);

export default router4;
