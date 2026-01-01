import express from "express";
import contactRouter from "./routes/contact.js"; // adjust path
import cors from "cors";

const app = express();


// CORS (if your frontend is on a different domain)

app.use(
  cors({
    origin: "https://teni-hair-frontend.vercel.app/", // e.g. "https://your-frontend.com"
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

// Parse JSON bodies
app.use(express.json());

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