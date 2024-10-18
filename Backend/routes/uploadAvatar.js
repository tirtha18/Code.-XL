import { uploadAvatar } from "../controllers/uploadAvatar.js";
import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import { delcacheData } from "../middlewares/delcachedata.js";
const uploadAvatarRouter = express.Router();

uploadAvatarRouter.post(
  "/uploadAvatar",
  
  upload.single("avatar"),(req, res, next) => delcacheData(req, res, next, "/api/getUser?user_id="),
  uploadAvatar
);

export default uploadAvatarRouter;
