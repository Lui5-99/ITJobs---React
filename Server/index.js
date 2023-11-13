import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/User.js";
import vacancyRoutes from "./routes/Vacancy.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
dotenv.config();

connectDB();

console.log(process.env.FRONTEND_URL);

// Set Cors
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoutes);
app.use("/api/vacancies", vacancyRoutes);

const server = app.listen(PORT, () => {
  console.log("Server running in port", PORT);
});
