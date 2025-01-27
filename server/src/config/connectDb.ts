import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Server is running and DB connection is successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
