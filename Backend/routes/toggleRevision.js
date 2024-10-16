import express from "express";
import { toggleRevision } from "../controllers/addRevision.js";
import { delcacheData } from "../middlewares/delcachedata.js";
const routerRevision_toggle = express.Router();
routerRevision_toggle.post(
  "/toggle_rev_probstatus",
  (req, res, next) => delcacheData(req, res, next, "/api/getSheets?user_id="),
  toggleRevision
);

export default routerRevision_toggle;