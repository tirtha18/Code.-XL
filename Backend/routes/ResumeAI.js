import express from "express";

import {Random} from "../controllers/ResumeAI.js"

import {upload} from "../middlewares/multerConfig.js"

const resumeRouter = express.Router();

resumeRouter.post("/ResumeAI",upload.single("pdf"), Random);

export default resumeRouter;
