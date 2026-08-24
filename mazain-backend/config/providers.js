const PROVIDERS = {
  openai: {
    baseURL: undefined,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  },
  groq: {
    baseURL: 'https://api.groq.com/openai/v1',
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
  },
};

function detectProvider(keyValue) {
  if (keyValue.startsWith('gsk_')) return 'groq';
  if (keyValue.startsWith('sk-')) return 'openai';
  return 'openai';
}

function resolveProvider(keyValue, storedProvider) {
  if (storedProvider && storedProvider !== 'auto' && PROVIDERS[storedProvider]) {
    return storedProvider;
  }
  return detectProvider(keyValue);
}

module.exports = { PROVIDERS, detectProvider, resolveProvider };