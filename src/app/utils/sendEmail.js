import nodemailer from "nodemailer";
import config from "../config.js";

export const sendEmail = async (to, html, subject) => {
  console.log(
    config.email_app_id, // Your Gmail email address
    config.email_app_pass
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.app_env === "production", // Use true for production
    auth: {
      user: config.email_app_id, // Your Gmail email address
      pass: config.email_app_pass, // Your App Password
    },
    logger: true, // Enable logging
    debug: true, // Enable debugging
  });

  try {
    await transporter.sendMail({
      from: config.email_app_id, // sender address
      to, // recipient
      subject, // Subject line
      html, // HTML body
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
