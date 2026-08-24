// Simple in-memory store for conversation history.
// NOTE: This resets whenever the server restarts, and only works for a
// single server instance.
const { SYSTEM_PROMPT } = require('../config/systemPrompt');

// Shape: { [sessionId]: [{ role, content, timestamp }, ...] }
const conversations = {};

function getOrCreateConversation(sessionId) {
  if (!conversations[sessionId]) {
    conversations[sessionId] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
        timestamp: new Date().toISOString(),
      },
    ];
  }
  return conversations[sessionId];
}

function addMessage(sessionId, role, content) {
  const conversation = getOrCreateConversation(sessionId);
  conversation.push({
    role,
    content,
    timestamp: new Date().toISOString(),
  });
  return conversation;
}

function getMessagesForApi(sessionId) {
  const conversation = getOrCreateConversation(sessionId);
  return conversation.map(({ role, content }) => ({ role, content }));
}

function clearConversation(sessionId) {
  delete conversations[sessionId];
}

module.exports = {
  conversationStore: {
    getOrCreateConversation,
    addMessage,
    getMessagesForApi,
    clearConversation,
  },
};