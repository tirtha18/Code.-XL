import express from "express";
import multer from 'multer';
import { extract } from "../controllers/sheetextract.js";

const router1 = express.Router();

const upload = multer({ dest: 'uploads/' });

router1.post("/upload", upload.single("excelFile"),extract);

export default router1;
