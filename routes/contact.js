import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      service,
      subservice,
      subservice2,
      date,
      time,
      message,
    } = req.body;

    const headers = {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    /* ================= ADMIN EMAIL ================= */
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Teni Hair & Beauty Studio",
          email: "tayek62@gmail.com",
        },
        to: [{ email: "tayek62@gmail.com" }],
        subject: "New Booking Received",
        htmlContent: `
          <h3>New Booking Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Subservice:</strong> ${subservice}</p>
          <p><strong>Specification:</strong> ${subservice2 || "N/A"}</p>
          <p><strong>Date:</strong> ${date || "N/A"}</p>
          <p><strong>Time:</strong> ${time || "N/A"}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
        `,
      },
      { headers }
    );

    /* ================= CLIENT EMAIL ================= */
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Teni Hair & Beauty Studio",
          email: "tayek62@gmail.com",
        },
        to: [{ email }],
        subject: "Booking Confirmed – Teni Hair & Beauty Studio",
        htmlContent: `
          <p>Hello ${name},</p>
          <p>Your booking has been <strong>successfully received</strong>.</p>
          <p><strong>Date:</strong> ${date || "N/A"}</p>
          <p><strong>Time:</strong> ${time || "N/A"}</p>
          <p>We look forward to seeing you</p>
        `,
      },
      { headers }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("BREVO API ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

export default router;
