import { Request, Response } from "express";
import { statusCode } from "../types/types";
import Company from "../models/companyModel";
import { generateOtp, generateToken } from "../lib/utils";
import Otp from "../models/otpModel";
import { sendVerificationEmail } from "../lib/mailServices";

const createCompany = async (req: Request, res: Response) => {
  const { companyName, companyEmail } = req.body;

  try {
    const isCompanyEmailExists = await Company.findOne({ companyEmail });

    if (isCompanyEmailExists) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message:
          "Company with same email already exists. Please give different email.",
      });
      return;
    }

    const createCompany = await Company.create({
      companyName,
      companyEmail,
    });

    if (!createCompany) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Company hasn't created. Please try again.",
      });
      return;
    }

    const otp = generateOtp();

    const createOtp = await Otp.create({
      companyId: createCompany._id,
      emailOtp: otp,
    });

    await sendVerificationEmail(createCompany.companyEmail, otp);

    res.status(statusCode.CREATED).json({
      success: true,
      message: "OTP has been sent to your email. Please verify",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not Create Company. Try again later ",
    });
  }
};

const verifyCompany = async (req: Request, res: Response) => {
  const { companyEmail, otp } = req.body;
  try {
    const company = await Company.findOne({ companyEmail });

    if (!company) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Please try again.",
      });
      return;
    }

    const findOtp = await Otp.findOne({
      companyId: company._id,
    });

    if (findOtp.emailOtp === otp) {
      company.isVerified = true;
    } else {
      res.status(statusCode.NOT_ACCEPTABLE).json({
        success: false,
        message: "Invalid otp",
      });
      return;
    }

    await company.save();
    await Otp.findByIdAndDelete(findOtp._id);

    const token = generateToken(company._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(statusCode.ACCEPTED).json({
      success: true,
      token,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not Create Company. Try again later ",
    });
  }
};

const loginCompany = async (req: Request, res: Response) => {
  const { companyEmail } = req.body;

  try {
    const company = await Company.findOne({ companyEmail });

    if (!company) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Company not found. Please Create one",
      });
      return;
    }

    const token = generateToken(company._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(statusCode.ACCEPTED).json({
      success: true,
      token,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not login Company. Try again later ",
    });
  }
};

const logoutCompany = async (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export { createCompany, verifyCompany, loginCompany, logoutCompany };
