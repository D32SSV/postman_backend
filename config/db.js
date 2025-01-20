import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI).then(() =>
      console.log("MongoDB connected")
    );
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
