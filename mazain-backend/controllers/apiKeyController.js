const { pool } = require('../config/db');
const { sanitize } = require('../utils/sanitize');
const { detectProvider } = require('../config/providers');

exports.getKeys = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM api_keys ORDER BY created_at DESC');
    const masked = rows.map((k) => ({
      ...k,
      key_value: maskKey(k.key_value),
      // Shows the effectively-used provider even if stored as "auto"
      resolved_provider: k.provider && k.provider !== 'auto' ? k.provider : detectProvider(k.key_value),
    }));
    return res.json({ status: 'success', data: masked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not fetch API keys' });
  }
};

exports.addKey = async (req, res) => {
  try {
    const label = sanitize(req.body.label);
    const keyValue = (req.body.key_value || '').trim();
    // 'auto' (default), 'openai', or 'groq' — validated against a known list so a
    // bad value can't silently break resolveProvider() later
    const provider = ['auto', 'openai', 'groq'].includes(req.body.provider) ? req.body.provider : 'auto';

    if (!label || !keyValue) {
      return res.status(400).json({ status: 'error', message: 'Label and key value are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO api_keys (label, key_value, provider) VALUES (?, ?, ?)',
      [label, keyValue, provider]
    );

    return res.json({ status: 'success', id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not add API key' });
  }
};

exports.toggleKey = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT is_active FROM api_keys WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Key not found' });
    }
    const newStatus = !rows[0].is_active;
    await pool.query('UPDATE api_keys SET is_active = ? WHERE id = ?', [newStatus, id]);
    return res.json({ status: 'success', is_active: newStatus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not update API key' });
  }
};

exports.deleteKey = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM api_keys WHERE id = ?', [id]);
    return res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Could not delete API key' });
  }
};

function maskKey(key) {
  if (!key || key.length < 8) return '••••••••';
  return `${key.slice(0, 6)}${'•'.repeat(8)}${key.slice(-4)}`;
}