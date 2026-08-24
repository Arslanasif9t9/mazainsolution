// Basic equivalent of PHP's htmlspecialchars() — strips HTML-significant characters
// so submitted text can't inject markup/scripts into emails or the admin dashboard.
function sanitize(str = '') {
  return String(str)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Basic email format check — mirrors PHP's FILTER_SANITIZE_EMAIL intent
function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

module.exports = { sanitize, isValidEmail };
