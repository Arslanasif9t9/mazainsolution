const express = require('express');
const router = express.Router();
const { chatController } = require('../controllers/chatController');

router.post('/', chatController.handleChatMessage);            // POST /api/chat
router.delete('/:sessionId', chatController.clearChatSession);  // DELETE /api/chat/:sessionId

module.exports = router;