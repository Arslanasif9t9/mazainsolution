const nodemailer = require('nodemailer');

// Uses Gmail to match the original PHP's "mazaincontact@gmail.com" sender.
// Requires a Gmail App Password — see README for setup steps.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

module.exports = transporter;
