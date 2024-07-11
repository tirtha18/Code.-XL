import express, { response } from "express";

import router from "./routes/auth.js";

import router1 from "./routes/sheetupload.js";

import router2 from "./routes/togglepstatus.js";

import router3 from "./routes/getsheets.js";

import router4 from "./routes/getUser.js";

import router5 from "./routes/uploadMocktest.js";

import router6 from "./routes/getMock.js";

import { connectToDatabase } from "./config/database.js";

import cors from "cors";

const app = express();

connectToDatabase();

app.use(express.json());

app.use(cors());

app.use("/api/auth", router);

app.use("/api/", router1);

app.use("/api/", router2);

app.use("/api/", router3);

app.use("/api/", router4);

app.use("/api/",router5);

app.use("/api/",router6);

app.listen(process.env.PORT || 3000, () => {
  console.log("Express server initialized");
});
