import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

interface IJob extends Document {
  jobTitle: string;
  jobDescription: string;
  jobExperience: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
  endDate: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  appliedCandidates?: string[]; // just to store users emails
}

const jobSchema = new Schema<IJob>({
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
  },
  jobDescription: {
    type: String,
    required: [true, "Job Description is required"],
  },
  jobExperience: {
    type: String,
    enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"],
    default: "BEGINNER",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  endDate: {
    type: String,
    required: [true, "End date is required"],
  },
  appliedCandidates: [
    {
      type: String,
    },
  ],
});

const Job = mongoose.models.jobs || mongoose.model<IJob>("Job", jobSchema);

export default Job;
