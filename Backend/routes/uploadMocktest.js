import express from "express";

const router5 = express.Router();

import { mockResults } from "../controllers/mockResults.js";

router5.post("/uploadMock", mockResults);

export default router5;
