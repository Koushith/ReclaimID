import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  getStatus,
  initSession,
  responseFromReclaimWallet,
} from "./controllers/reclaim.controller.js";
import { connectToDB } from "./utils/db.config.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { asyncHandler } from "./middlewares/asyncHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectToDB();

app.use(cors());
app.use(express.json()); // body parser- parse JSON

//Reclaim

app.post("/verify/init", initSession);
app.get("/verify/status/:id", getStatus);

//React Native
app.use(express.text({ type: "*/*" }));
app.post("/callback/:callbackId", responseFromReclaimWallet);

app.get("/", (req, res) => {
  res.send("This route works!!");
});

// custom middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on Prort- ${PORT}`);
});
