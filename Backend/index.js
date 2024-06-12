import express from "express";

import router from "./routes/auth.js";

import router1 from "./routes/sheetupload.js";

import router2 from "./routes/togglepstatus.js";

import { connectToDatabase } from "./config/database.js";

import cors from "cors";

const app = express();

connectToDatabase();

app.use(express.json());

app.use(cors());

app.use("/api/auth", router);

app.use("/api/", router1);

app.use("/api/", router2);

app.get('/abc',async (req,res) => {res.send("gjhkrefw")});

app.listen(process.env.PORT || 3000, () => {
  console.log("Express server initialized");
});
