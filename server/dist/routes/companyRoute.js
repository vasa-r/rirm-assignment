"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const companyRouter = (0, express_1.Router)();
companyRouter.post("/register", companyController_1.createCompany);
companyRouter.post("/login", companyController_1.loginCompany);
companyRouter.patch("/verify", companyController_1.verifyCompany);
// companyRouter.get("/logout", verifyToken, logoutCompany);
exports.default = companyRouter;
