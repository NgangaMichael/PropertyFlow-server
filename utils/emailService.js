import nodemailer from 'nodemailer';

// Configure the Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your gmail: e.g. grandnumproperties@gmail.com
    pass: process.env.EMAIL_PASS, // Your Gmail App Password (NOT your regular password)
  },
});

export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  const mailOptions = {
    from: `"Grandnum Properties" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments, // Array of { filename: 'lease.pdf', content: buffer/base64 }
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Email error: ', error);
    throw new Error('Failed to send email');
  }
};