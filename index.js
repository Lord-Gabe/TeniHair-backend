import express from "express";
import contactRouter from "./routes/contact.js"; // adjust path

const app = express();

// Parse JSON bodies
app.use(express.json());

// // CORS (if your frontend is on a different domain)
// import cors from "cors";
// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN || "*", // e.g. "https://your-frontend.com"
//   })
// );

// Mount the contact route
app.use("/api/contact", contactRouter);

// Basic health check
app.get("/", (req, res) => {
  res.send("Teni Hair & Beauty Studio API is running");
});

// Render uses PORT from env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});