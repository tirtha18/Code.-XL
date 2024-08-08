import express from "express";

import { addNotes } from "../controllers/addNotes.js";

import { delcacheData } from "../middlewares/delcachedata.js";
const router7 = express.Router();

router7.post(
  "/addNotes",
  (req, res, next) => delcacheData(req, res, next, "/api/getSheets?user_id="),
  addNotes
);

export default router7;
