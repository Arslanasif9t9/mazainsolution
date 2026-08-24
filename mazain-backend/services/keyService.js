// Resolves which API key (and provider) the chatbot's AI client should use right now.
// Source of truth is the api_keys table (managed via the admin dashboard's
// "API Keys" panel — see controllers/apiKeyController.js).
const { pool } = require('../config/db');

const CACHE_TTL_MS = 60 * 1000; // 1 minute

let cachedRecord = null; // { key_value, provider }
let cachedAt = 0;

async function getActiveKeyRecord() {
  const now = Date.now();
  if (cachedRecord && now - cachedAt < CACHE_TTL_MS) {
    return cachedRecord;
  }

  try {
    const [rows] = await pool.query(
      'SELECT key_value, provider FROM api_keys WHERE is_active = TRUE ORDER BY created_at ASC LIMIT 1'
    );

    if (rows.length > 0) {
      cachedRecord = { key_value: rows[0].key_value, provider: rows[0].provider };
      cachedAt = now;
      return cachedRecord;
    }
  } catch (err) {
    console.error('Could not read api_keys table:', err.message);
  }

  if (process.env.OPENAI_API_KEY) {
    cachedRecord = { key_value: process.env.OPENAI_API_KEY, provider: 'auto' };
    cachedAt = now;
    return cachedRecord;
  }

  cachedRecord = null;
  return null;
}

function invalidateCache() {
  cachedRecord = null;
  cachedAt = 0;
}

module.exports = { keyService: { getActiveKeyRecord, invalidateCache } };