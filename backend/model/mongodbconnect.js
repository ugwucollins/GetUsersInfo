import mongoose from "mongoose";
import "dotenv/config";

const connectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    mongoose.set('bufferCommands', false);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
