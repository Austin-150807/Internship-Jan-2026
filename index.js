import express from "express";

const app = express();
import dotenv from "dotenv";
import connectDB from "./src/helper/dbConnection.js";
import router from "./routes.js";
dotenv.config({ quiet: true });
import cors from "cors";
const PORT = process.env.PORT;

app.use(cors()); //have to use before anything else
app.use(express.json()); // to allow json format data in request body
app.use(express.urlencoded({ extended: true })); // to allow urlencoded data in request body
connectDB();
router(app);

app.listen(PORT, () => {
  console.log("server is runnig on port ", PORT);
});
