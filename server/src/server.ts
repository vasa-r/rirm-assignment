import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDb";
import { statusCode } from "./types/types";
import errorHandler from "./middleware/errorHandler";
import companyRouter from "./routes/companyRoute";
import verifyToken from "./middleware/verifyToken";
import jobRouter from "./routes/jobRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/health", async (_, res) => {
  res.json({
    success: true,
    message: "API up and running",
  });
});

// app routes
app.use("/api/company", companyRouter);
app.use("/api/job", verifyToken, jobRouter);

app.use("*", (_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => connectDb());
