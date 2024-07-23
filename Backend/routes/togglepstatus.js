import express from "express";
import { togglestatus } from "../controllers/togglestatus.js";
import { delcacheData } from "../middlewares/delcachedata.js";

const router2 = express.Router();

router2.post(
  "/toggleprobstatus",
  (req, res, next) => delcacheData(req, res, next, "/api/getSheets?user_id="),
  togglestatus
);

export default router2;
