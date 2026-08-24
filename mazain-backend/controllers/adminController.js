const jwt = require('jsonwebtoken');

// Simple single-admin login using credentials from .env — no separate Admin collection needed
// unless you want multiple admin accounts later (see README for how to extend this).
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username and password are required' });
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
  return res.json({ status: 'success', token });
};
