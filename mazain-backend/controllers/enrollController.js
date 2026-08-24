const { pool } = require('../config/db');
const transporter = require('../config/mailer');
const { sanitize, isValidEmail } = require('../utils/sanitize');

exports.submitEnrollment = async (req, res) => {
  try {
    const firstName = sanitize(req.body.firstName);
    const lastName = sanitize(req.body.lastName);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const course = sanitize(req.body.course);
    const education = sanitize(req.body.education);
    const experience = sanitize(req.body.experience);
    const goals = sanitize(req.body.goals);
    const terms = Boolean(req.body.terms);

    if (!firstName || !lastName || !email || !phone || !course || !goals || !terms) {
      return res.status(400).json({ status: 'error', message: 'Please fill in all required fields' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ status: 'error', message: 'Enter a valid email address' });
    }

    await pool.query(
      `INSERT INTO enrollments (first_name, last_name, email, phone, course, education, experience, goals, terms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone, course, education || null, experience || null, goals, terms]
    );

    try {
      await transporter.sendMail({
        from: `"Mazain Solution Website" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: 'New Course Enrollment',
        text: `New Enrollment:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Course: ${course}
Education: ${education || 'Not provided'}
Experience: ${experience || 'Not provided'}
Goals: ${goals}`,
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

exports.getEnrollments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enrollments ORDER BY created_at DESC');
    return res.json({ status: 'success', data: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not fetch enrollments' });
  }
};
