// The chatbot runs on the same backend as everything else (mazain-backend),
// so it reuses the existing shared Axios instance. No auth token is sent here —
// /api/chat is a public endpoint for anonymous site visitors, unlike the
// /api/admin/* routes which require a Bearer token.
import axiosClient from './axiosClient';

export async function sendChatMessage(sessionId, message) {
  const response = await axiosClient.post('/chat', { sessionId, message });
  return response.data.reply;
}

export async function clearChatSession(sessionId) {
  await axiosClient.delete(`/chat/${sessionId}`);
}