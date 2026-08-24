const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

router.post('/', submitContact); // POST /api/contact

module.exports = router;
