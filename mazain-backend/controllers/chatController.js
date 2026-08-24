const { conversationStore } = require('../services/conversationStore');
const { openaiService } = require('../services/openaiService');

// POST /api/chat
// Body: { sessionId: string, message: string }
async function handleChatMessage(req, res, next) {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'sessionId is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'message must be a non-empty string.' });
    }

    conversationStore.addMessage(sessionId, 'user', message.trim());

    const messages = conversationStore.getMessagesForApi(sessionId);
    const reply = await openaiService.getChatCompletion(messages);

    conversationStore.addMessage(sessionId, 'assistant', reply);

    return res.status(200).json({ reply });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/chat/:sessionId — clears a session's history (used by the "Clear Chat" button)
function clearChatSession(req, res) {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required.' });
  }

  conversationStore.clearConversation(sessionId);
  return res.status(200).json({ message: 'Conversation cleared.' });
}

module.exports = { chatController: { handleChatMessage, clearChatSession } };