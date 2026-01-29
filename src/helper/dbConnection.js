import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/test")
    .connect(
      "mongodb+srv://FitnessUser:Pf5U5JKxXkJsBfUd@fitnesscluster.ob0abwb.mongodb.net/?appName=FitnessCluster",
      { dbName: "intership-jan-2026" },
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Err while connecting to DB", err));
};

export default connectDB;
