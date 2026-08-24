const { pool } = require('../config/db');
const transporter = require('../config/mailer');
const { sanitize, isValidEmail } = require('../utils/sanitize');

exports.submitContact = async (req, res) => {
  try {
    const fname = sanitize(req.body.fnam);
    const lname = sanitize(req.body.lname);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const serviceName = sanitize(req.body['service-name']);
    const message = sanitize(req.body.msg);

    if (!fname || !lname || !email || !phone || !serviceName || !message) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ status: 'error', message: 'Enter a valid email address' });
    }

    // Parameterized query — protects against SQL injection (values are never concatenated into the SQL string)
    await pool.query(
      'INSERT INTO contact_requests (fname, lname, email, phone, service_name, message) VALUES (?, ?, ?, ?, ?, ?)',
      [fname, lname, email, phone, serviceName, message]
    );

    try {
      await transporter.sendMail({
        from: `"Mazain Solution Website" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: 'New Contact Form Submission',
        text: `New Contact Request:

First Name: ${fname}
Last Name: ${lname}
Email: ${email}
Phone: ${phone}
Service: ${serviceName}
Message: ${message}`,
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
      return res.json({ status: 'success', message: 'Saved, but email notification failed to send.' });
    }

    return res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Something went wrong. Please try again.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_requests ORDER BY created_at DESC');
    return res.json({ status: 'success', data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not fetch contacts' });
  }
};
