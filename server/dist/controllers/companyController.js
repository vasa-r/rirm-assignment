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
exports.logoutCompany = exports.loginCompany = exports.verifyCompany = exports.createCompany = void 0;
const types_1 = require("../types/types");
const companyModel_1 = __importDefault(require("../models/companyModel"));
const utils_1 = require("../lib/utils");
const otpModel_1 = __importDefault(require("../models/otpModel"));
const mailServices_1 = require("../lib/mailServices");
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, companyEmail } = req.body;
    try {
        const isCompanyEmailExists = yield companyModel_1.default.findOne({ companyEmail });
        if (isCompanyEmailExists) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "Company with same email already exists. Please give different email.",
            });
            return;
        }
        const createCompany = yield companyModel_1.default.create({
            companyName,
            companyEmail,
        });
        if (!createCompany) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Company hasn't created. Please try again.",
            });
            return;
        }
        const otp = (0, utils_1.generateOtp)();
        const createOtp = yield otpModel_1.default.create({
            companyId: createCompany._id,
            emailOtp: otp,
        });
        yield (0, mailServices_1.sendVerificationEmail)(createCompany.companyEmail, otp);
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "OTP has been sent to your email. Please verify",
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not Create Company. Try again later ",
        });
    }
});
exports.createCompany = createCompany;
const verifyCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyEmail, otp } = req.body;
    try {
        const company = yield companyModel_1.default.findOne({ companyEmail });
        if (!company) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Please try again.",
            });
            return;
        }
        const findOtp = yield otpModel_1.default.findOne({
            companyId: company._id,
        });
        if (findOtp.emailOtp === otp) {
            company.isVerified = true;
        }
        else {
            res.status(types_1.statusCode.NOT_ACCEPTABLE).json({
                success: false,
                message: "Invalid otp",
            });
            return;
        }
        yield company.save();
        yield otpModel_1.default.findByIdAndDelete(findOtp._id);
        const token = (0, utils_1.generateToken)(company._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(types_1.statusCode.ACCEPTED).json({
            success: true,
            token,
            message: "Email verified successfully.",
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not Create Company. Try again later ",
        });
    }
});
exports.verifyCompany = verifyCompany;
const loginCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyEmail } = req.body;
    try {
        const company = yield companyModel_1.default.findOne({ companyEmail });
        if (!company) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Company not found. Please Create one",
            });
            return;
        }
        const token = (0, utils_1.generateToken)(company._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(types_1.statusCode.ACCEPTED).json({
            success: true,
            token,
            message: "Login Successful",
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not login Company. Try again later ",
        });
    }
});
exports.loginCompany = loginCompany;
const logoutCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
});
exports.logoutCompany = logoutCompany;
