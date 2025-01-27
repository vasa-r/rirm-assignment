import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomUserReq, statusCode } from "../types/types";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET!;

const verifyToken = (req: CustomUserReq, res: Response, next: NextFunction) => {
  try {
    const token = req?.cookies;

    console.log(token);

    if (token) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Token not found",
      });
      return;
    }

    // const decoded = jwt.verify(token, secret) as JwtPayload;

    // console.log(decoded);
    // if (decoded && typeof decoded === "object" && decoded.id) {
    //   req.userId = decoded.id;
    //   // console.log(req.userId);
    //   next();
    // } else {
    //   res.status(statusCode.UNAUTHORIZED).json({
    //     success: false,
    //     message: "Invalid token structure",
    //   });
    //   return;
    // }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default verifyToken;
