"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const types_1 = require("./types/types");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const companyRoute_1 = __importDefault(require("./routes/companyRoute"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const jobRouter_1 = __importDefault(require("./routes/jobRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/health", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        success: true,
        message: "API up and running",
    });
}));
// app routes
app.use("/api/company", companyRoute_1.default);
app.use("/api/job", verifyToken_1.default, jobRouter_1.default);
app.use("*", (_, res) => {
    res.status(types_1.statusCode.NOT_FOUND).json({
        success: false,
        message: "Endpoint not found",
    });
});
app.use(errorHandler_1.default);
app.listen(PORT, () => (0, connectDb_1.default)());
