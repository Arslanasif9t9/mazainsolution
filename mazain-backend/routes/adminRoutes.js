const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');
const { getContacts } = require('../controllers/contactController');
const { getEnrollments } = require('../controllers/enrollController');
const { getKeys, addKey, toggleKey, deleteKey } = require('../controllers/apiKeyController');
const requireAuth = require('../middleware/auth');

router.post('/login', login);                              // POST /api/admin/login
router.get('/contacts', requireAuth, getContacts);          // GET /api/admin/contacts
router.get('/enrollments', requireAuth, getEnrollments);    // GET /api/admin/enrollments

router.get('/api-keys', requireAuth, getKeys);               // GET /api/admin/api-keys
router.post('/api-keys', requireAuth, addKey);                // POST /api/admin/api-keys
router.patch('/api-keys/:id/toggle', requireAuth, toggleKey);  // PATCH /api/admin/api-keys/:id/toggle
router.delete('/api-keys/:id', requireAuth, deleteKey);         // DELETE /api/admin/api-keys/:id

module.exports = router;