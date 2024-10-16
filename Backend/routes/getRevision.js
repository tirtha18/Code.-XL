import express from "express"

import { getRevision } from "../controllers/getRevision.js";

const getrevRouter = express.Router();

getrevRouter.get("/getRevision", getRevision);

export default getrevRouter;
