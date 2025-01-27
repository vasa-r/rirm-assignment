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
exports.notifyCandidates = exports.getJobs = exports.getJobById = exports.deleteJob = exports.updateJob = exports.createJob = void 0;
const jobModel_1 = __importDefault(require("../models/jobModel"));
const types_1 = require("../types/types");
const companyModel_1 = __importDefault(require("../models/companyModel"));
const mailServices_1 = require("../lib/mailServices");
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { jobTitle, jobDescription, jobExperience, endDate } = req.body;
    const { companyId } = req;
    try {
        const company = yield companyModel_1.default.findById(companyId);
        if (!company) {
            res.status(404).json({
                success: false,
                message: "Company not found.",
            });
            return;
        }
        const newJob = yield jobModel_1.default.create({
            jobTitle,
            jobDescription,
            jobExperience,
            endDate,
            createdBy: companyId,
        });
        if (!newJob) {
            res.status(500).json({
                success: false,
                message: "Job creation failed. Please try again.",
            });
            return;
        }
        (_a = company.jobPosts) === null || _a === void 0 ? void 0 : _a.push(newJob._id);
        yield company.save();
        res.status(201).json({
            success: true,
            message: "Job created successfully.",
            data: newJob,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the job. Please try again later.",
        });
    }
});
exports.createJob = createJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    const { appliedCandidates } = req.body;
    try {
        const job = yield jobModel_1.default.findById(jobId);
        if (!job) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Job not found.",
            });
            return;
        }
        const updatedJob = yield jobModel_1.default.findByIdAndUpdate(jobId, { $addToSet: { appliedCandidates: { $each: appliedCandidates } } }, { new: true, runValidators: true });
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Applied candidates updated successfully.",
            data: updatedJob,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not update applied candidates. Try again later.",
        });
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    try {
        const job = yield jobModel_1.default.findById(jobId);
        if (!job) {
            res.status(404).json({
                success: false,
                message: "Job not found.",
            });
            return;
        }
        yield jobModel_1.default.findByIdAndDelete(jobId);
        res.status(200).json({
            success: true,
            message: "Job deleted successfully.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not delete the job. Try again later.",
        });
    }
});
exports.deleteJob = deleteJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobModel_1.default.find();
        res.status(200).json({
            success: true,
            data: jobs,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not retrieve jobs. Try again later.",
        });
    }
});
exports.getJobs = getJobs;
const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.params;
    try {
        const job = yield jobModel_1.default.findById(jobId);
        if (!job) {
            res.status(404).json({
                success: false,
                message: "Job not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: job,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not retrieve the job. Try again later.",
        });
    }
});
exports.getJobById = getJobById;
const notifyCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req;
    const { jobId } = req.params;
    try {
        const company = yield companyModel_1.default.findById(companyId);
        const jobDetails = yield jobModel_1.default.findById(jobId);
        if (!jobDetails) {
            res.status(404).json({
                success: false,
                message: "No job details.",
            });
            return;
        }
        jobDetails.appliedCandidates.forEach((email) => (0, mailServices_1.sendJobAlert)(company.companyName, company.companyEmail, email, jobDetails));
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Job alerts sent to all candidates",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not notify candidates. Try again later.",
        });
    }
});
exports.notifyCandidates = notifyCandidates;
