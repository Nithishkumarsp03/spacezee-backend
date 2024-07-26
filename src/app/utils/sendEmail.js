import nodemailer from "nodemailer";
import config from "../config.js";

export const sendEmail = async (to, html, subject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.app_env === "production",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.email_app_id,
      pass: config.email_app_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_app_id, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html, // html body
  });
};
