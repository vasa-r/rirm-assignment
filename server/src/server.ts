import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb";
import { statusCode } from "./types/types";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API up and running",
  });
});

app.use("*", (_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => connectDb());
