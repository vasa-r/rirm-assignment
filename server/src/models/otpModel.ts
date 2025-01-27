import mongoose, { Schema, Document } from "mongoose";

interface IOtp extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  emailOtp: string;
}

const otpSchema = new Schema<IOtp>({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  emailOtp: {
    type: String,
    required: true,
  },
});

const Otp = mongoose.models.otps || mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;
