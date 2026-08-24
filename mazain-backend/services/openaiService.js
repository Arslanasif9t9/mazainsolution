const OpenAI = require('openai');
const { keyService } = require('./keyService');
const { PROVIDERS, resolveProvider } = require('../config/providers');

let cachedClient = null;
let cachedClientKey = null; // tracks "apiKey|provider" so a provider change also rebuilds the client

async function getClientAndModel() {
  const record = await keyService.getActiveKeyRecord();

  if (!record) {
    throw { statusCode: 500, message: 'No active API key configured. Add one in the admin dashboard.' };
  }

  const provider = resolveProvider(record.key_value, record.provider);
  const providerConfig = PROVIDERS[provider];
  const cacheKey = `${record.key_value}|${provider}`;

  if (cacheKey !== cachedClientKey) {
    cachedClient = new OpenAI({
      apiKey: record.key_value,
      baseURL: providerConfig.baseURL,
    });
    cachedClientKey = cacheKey;
  }

  return { client: cachedClient, model: providerConfig.model, provider };
}

async function getChatCompletion(messages) {
  try {
    const { client, model } = await getClientAndModel();

    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content;
    if (!reply) throw new Error('The AI service returned an empty response.');
    return reply;
  } catch (error) {
    if (error.statusCode) throw error;
       console.error('[openaiService] Raw error from AI provider:', error);

    if (error.status === 401) {
      keyService.invalidateCache();
      throw { statusCode: 500, message: 'The configured API key was rejected. Check the admin dashboard.' };
    }
    if (error.status === 429) {
      throw { statusCode: 429, message: 'Rate limit exceeded. Please try again in a moment.' };
    }
    if (error.code === 'ETIMEDOUT' || error.type === 'request_timeout') {
      throw { statusCode: 504, message: 'The AI service timed out. Please try again.' };
    }
    throw { statusCode: 502, message: 'Failed to get a response from the AI service.' };
  }
}

module.exports = { openaiService: { getChatCompletion } };