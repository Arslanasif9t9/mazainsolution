const express = require('express');
const router = express.Router();
const { submitEnrollment } = require('../controllers/enrollController');

router.post('/', submitEnrollment); // POST /api/enroll

module.exports = router;
