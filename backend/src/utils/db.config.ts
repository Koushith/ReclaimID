import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const host = await mongoose.connect(process.env.DATABASE_URL!);
    console.log(`connected to mongoDB- ${host?.connection.host}`);
  } catch (error: any) {
    console.log(`Someting went wrong while connecting.. ${error?.message}`);
    process.exit(1);
  }
};
