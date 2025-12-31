import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/contact.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
