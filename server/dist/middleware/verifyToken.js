"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types/types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Auth header not found",
            });
            return;
        }
        const items = authHeader.split(" ");
        if (items.length !== 2 || items[0] !== "Bearer") {
            res.status(types_1.statusCode.NOT_ACCEPTABLE).json({
                success: false,
                message: "Invalid Authorization header format",
            });
            return;
        }
        const token = items[1];
        if (!token) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Token not found",
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // console.log(decoded);
        if (decoded && typeof decoded === "object" && decoded.id) {
            req.companyId = decoded.id;
            // console.log(req.userId);
            next();
        }
        else {
            res.status(types_1.statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token structure",
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.default = verifyToken;
