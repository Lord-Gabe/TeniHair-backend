import express from "express";
import nodemailer from "nodemailer";

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


    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const formatTime = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${"00"} ${period}`;
    };


    // ADMIN EMAIL
    await transporter.sendMail({
        from: `Teni Hair & Beauty Studio`,
        replyTo: email, // replies go to client
        to: process.env.MAIL,
        subject: "New Booking Received",
        html: `
            <h3>New Booking Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Subservice:</strong> ${subservice}</p>
            <p><strong>Specification:</strong> ${subservice2 || "N/A"}</p>
            <p><strong>Date:</strong> ${date || "NIL"}</p>
            <p><strong>Time:</strong> ${formatTime(time) || "NIL"}</p>
            <p><strong>Message:</strong> ${message || "None"}</p>
        `,
        });

    // CLIENT AUTO-REPLY
    await transporter.sendMail({
      from: `Teni Hair & Beauty Studio <${process.env.MAIL}>`,
      to: email,
      subject: "Booking Confirmed – Teni Hair & Beauty Studio",
      html: `
        <p>Hello ${name},</p>
        <p>Your order has been <strong>successfully received</strong>.</p>
        <p>Here are your order details:</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Subservice:</strong> ${subservice}</p>
        <p><strong>Specification:</strong> ${subservice2}</p>
        <p><strong>Date:</strong> ${date || "Nil"}</p>
        <p><strong>Time:</strong> ${formatTime(time) || "Nil"}</p>
        <p><strong>Message:</strong> ${message || "None"}</p>
        <p>We look forward to seeing you</p>
      `,
    });

    res.json({ success: true });
  }catch (err) {
  console.error("FULL EMAIL ERROR ↓↓↓");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Email failed",
  });
}
});

export default router;
