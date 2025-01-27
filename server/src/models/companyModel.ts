import mongoose, { Document, Schema } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  companyEmail: string;
  isVerified?: boolean;
  jobPosts?: mongoose.Schema.Types.ObjectId[];
}

const companySchema = new Schema<ICompany>({
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  companyEmail: {
    type: String,
    required: [true, "Company Email is required"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  jobPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const Company =
  mongoose.models.companies ||
  mongoose.model<ICompany>("Company", companySchema);

export default Company;
