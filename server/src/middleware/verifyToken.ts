import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomUserReq, statusCode } from "../types/types";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET!;

const verifyToken = (req: CustomUserReq, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Auth header not found",
      });
      return;
    }

    const items = authHeader.split(" ");
    if (items.length !== 2 || items[0] !== "Bearer") {
      res.status(statusCode.NOT_ACCEPTABLE).json({
        success: false,
        message: "Invalid Authorization header format",
      });
      return;
    }

    const token = items[1];

    if (!token) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Token not found",
      });
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // console.log(decoded);
    if (decoded && typeof decoded === "object" && decoded.id) {
      req.companyId = decoded.id;
      // console.log(req.userId);
      next();
    } else {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token structure",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default verifyToken;
