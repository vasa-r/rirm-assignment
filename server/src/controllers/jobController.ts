import { Request, Response } from "express";
import Job from "../models/jobModel";
import { CustomUserReq, statusCode } from "../types/types";
import Company from "../models/companyModel";
import { sendJobAlert } from "../lib/mailServices";

const createJob = async (req: CustomUserReq, res: Response) => {
  const { jobTitle, jobDescription, jobExperience, endDate } = req.body;
  const { companyId } = req;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found.",
      });
      return;
    }

    const newJob = await Job.create({
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

    company.jobPosts?.push(newJob._id);
    await company.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: newJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while creating the job. Please try again later.",
    });
  }
};
const updateJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { appliedCandidates } = req.body;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Job not found.",
      });
      return;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { appliedCandidates: { $each: appliedCandidates } } },
      { new: true, runValidators: true }
    );

    res.status(statusCode.OK).json({
      success: true,
      message: "Applied candidates updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not update applied candidates. Try again later.",
    });
  }
};

const deleteJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found.",
      });
      return;
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not delete the job. Try again later.",
    });
  }
};

const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not retrieve jobs. Try again later.",
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findById(jobId);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not retrieve the job. Try again later.",
    });
  }
};

const notifyCandidates = async (req: CustomUserReq, res: Response) => {
  const { companyId } = req;
  const { jobId } = req.params;
  try {
    const company = await Company.findById(companyId);
    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) {
      res.status(404).json({
        success: false,
        message: "No job details.",
      });
      return;
    }

    jobDetails.appliedCandidates.forEach((email: string) =>
      sendJobAlert(company.companyName, company.companyEmail, email, jobDetails)
    );

    res.status(statusCode.OK).json({
      success: true,
      message: "Job alerts sent to all candidates",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not notify candidates. Try again later.",
    });
  }
};

export {
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  getJobs,
  notifyCandidates,
};
