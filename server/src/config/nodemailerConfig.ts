import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: USER_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    // Optional, if you already have an access token:
    // accessToken: 'Your-Access-Token-Here',
  },
});

export default transporter;
