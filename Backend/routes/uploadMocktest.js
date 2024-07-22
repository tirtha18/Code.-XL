import express from "express";
import { delcacheData } from "../middlewares/delcachedata.js";
const router5 = express.Router();

import { mockResults } from "../controllers/mockResults.js";

router5.post(
  "/uploadMock",
  (req, res, next) => delcacheData(req, res, next, "/api/getMock?user_id="),
  mockResults
);

export default router5;
