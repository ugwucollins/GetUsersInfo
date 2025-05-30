import express from "express";
import cors from "cors";
import router from "./routes/userRoute.js";
import connectMongoDB from "./model/mongodbconnect.js";
import "dotenv/config";

const app = express();
const port = 3000;
const { USERS_URL } = process.env;

app.use(cors());
app.use(express.json());
connectMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(`/${USERS_URL}`, router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
