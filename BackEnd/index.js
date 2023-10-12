import dotenv from "dotenv";
import authRouter from "./src/routes/authRouter.js";
import gmailRouter from "./src/routes/gmailRouter.js";
import resetRouter from "./src/routes/forgetGmailRouter.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());

app.use("/users", authRouter);
app.use("/register", gmailRouter);
app.use("/reset", resetRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
