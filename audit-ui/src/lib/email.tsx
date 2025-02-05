"use server";

import nodemailer from "nodemailer";

const serviceProvider = "gmail";

export default async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<boolean> {
  if (!to || !subject || !text) throw "Invalid email parameters";

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD)
    throw "Invalid environment variables";

  const transporter = nodemailer.createTransport({
    service: serviceProvider,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    secure: true,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
