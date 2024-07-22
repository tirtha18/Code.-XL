import express from "express";
import multer from "multer";
import { extract } from "../controllers/sheetextract.js";
import { delcacheData } from "../middlewares/delcachedata.js";
const router1 = express.Router();

const upload = multer({ dest: "uploads/" });

router1.post(
  "/upload",
  upload.single("excelFile"),
  (req, res, next) => delcacheData(req, res, next, "/api/getSheets?user_id="),
  extract
);

export default router1;
