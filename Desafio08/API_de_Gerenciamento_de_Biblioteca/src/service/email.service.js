// email.service.js
import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

logger.info("Email service initialized");

// Não inicialize o transporter no top-level - mover para dentro da função
let transporter = null;

function initializeTransporter() {
  if (!transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured. Check environment variables.");
    }
    
    transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

export function sendEmail(email, bookTitle, dueDate) {
  return new Promise((resolve, reject) => {
    try {
      const mailTransporter = initializeTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "📚 Book Return Reminder - Library",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Return Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f5">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td bgcolor="#4f46e5" style="padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📚 Digital Library</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #333333; margin-top: 0;">Return Reminder</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">
                                This is a friendly reminder that the book you borrowed is due soon.
                            </p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #f9fafb; border-radius: 6px; padding: 20px;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 10px 0; color: #4b5563; font-weight: bold;">Book Title:</p>
                                        <p style="margin: 0; color: #1f2937; font-size: 18px;"><strong>${bookTitle}</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 15px;">
                                        <p style="margin: 0 0 10px 0; color: #4b5563; font-weight: bold;">Due Date:</p>
                                        <p style="margin: 0; color: #dc2626; font-size: 18px;"><strong>${dueDate}</strong></p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">
                                Please ensure the book is returned by this date to avoid late fees.
                            </p>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5;">
                                Thank you for your cooperation!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td bgcolor="#f3f4f6" style="padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #6b7280; font-size: 14px;">
                                This is an automated email. Please do not reply to this message.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
                                © ${new Date().getFullYear()} Digital Library. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `,
      };

      mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error("Error sending email:", error);
          reject(error);
        } else {
          logger.info("Email sent:", info.response);
          resolve(info);
        }
      });
    } catch (error) {
      logger.error("Error initializing email transporter:", error);
      reject(error);
    }
  });
}

export default { sendEmail };