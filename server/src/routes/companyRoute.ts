import { Router } from "express";
import {
  createCompany,
  verifyCompany,
  loginCompany,
  logoutCompany,
} from "../controllers/companyController";
import verifyToken from "../middleware/verifyToken";

const companyRouter = Router();

companyRouter.post("/register", createCompany);

companyRouter.post("/login", loginCompany);

companyRouter.patch("/verify", verifyCompany);

// companyRouter.get("/logout", verifyToken, logoutCompany);

export default companyRouter;
