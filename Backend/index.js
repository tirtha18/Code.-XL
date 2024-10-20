import express, { response } from "express";

import router from "./routes/auth.js";

import router1 from "./routes/sheetupload.js";

import router2 from "./routes/togglepstatus.js";

import router3 from "./routes/getsheets.js";

import router4 from "./routes/getUser.js";

import router5 from "./routes/uploadMocktest.js";

import router6 from "./routes/getMock.js";

import router7 from "./routes/addNotes.js";

import routerRevision_toggle from "./routes/toggleRevision.js";

import { connectToDatabase } from "./config/database.js";

import getrevRouter from "./routes/getRevision.js";

import resumeRouter from "./routes/ResumeAI.js";

import cors from "cors";

import uploadAvatarRouter from "./routes/uploadAvatar.js";

const app = express();

connectToDatabase();

app.use(express.json());

app.use(cors());

app.use("/api/auth", router);

app.use("/api/", router1);

app.use("/api/", router2);

app.use("/api/", router3);

app.use("/api/", router4);

app.use("/api/", router5);

app.use("/api/", router6);

app.use("/api/", router7);

app.use("/api/", routerRevision_toggle);

app.use("/api/", getrevRouter);

app.use("/api/", resumeRouter);

app.use("/api/", uploadAvatarRouter);

app.get("/api/start_server", async (req, res) => {
  console.log("Server started Successfully");
  return res.status(200).json({ message: "Server started Succesfully" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Express server initialized");
});
