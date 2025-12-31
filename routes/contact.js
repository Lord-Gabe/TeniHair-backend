// routes/contact.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Create a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,         // your Gmail address
    pass: process.env.MAIL_PASS, // Gmail App Password, not your main password
  },
});

// Optional: verify connection configuration on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up Gmail transporter:", error);
  } else {
    console.log("Gmail transporter is ready to send emails");
  }
});

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

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // ========== ADMIN EMAIL ==========
    const adminMailOptions = {
      from: `"Teni Hair & Beauty Studio" <${process.env.MAIL_USER}>`,
      to: "tayek62@gmail.com", // admin email
      subject: "New Booking Received",
      html: `
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
    };

    await transporter.sendMail(adminMailOptions);

    // ========== CLIENT EMAIL ==========
    const clientMailOptions = {
      from: `"Teni Hair & Beauty Studio" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Booking Confirmed – Teni Hair & Beauty Studio",
      html: `
        <p>Hello ${name},</p>
        <p>Your order has been <strong>successfully received</strong>.</p>
        <p>You have placed in order: <strong>${service} -> ${subservice} and of lastly, ${subservice2}</strong>
        <p><strong>Date:</strong> ${date || "N/A"}</p>
        <p><strong>Time:</strong> ${time || "N/A"}</p>
        <p>We look forward to seeing you.</p>
      `,
    };

    await transporter.sendMail(clientMailOptions);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("GMAIL SMTP ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;