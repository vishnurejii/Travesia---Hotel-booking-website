import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    console.log("Database connected successfully");
    
    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
  }
};

export default connectDB;
