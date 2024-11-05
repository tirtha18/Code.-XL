import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import { extract } from "../controllers/sheetextract.js";
import { delcacheData } from "../middlewares/delcachedata.js";
const router1 = express.Router();
router1.post(
  "/upload",
  upload.single("excelFile"),
  (req, res, next) => delcacheData(req, res, next, "/api/getSheets?user_id="),
  extract
);

export default router1;
