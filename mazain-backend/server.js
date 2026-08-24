require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const contactRoutes = require('./routes/contactRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

testConnection();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes); // POST /api/contact, GET /api/admin/contacts
app.use('/api/enroll', enrollRoutes);   // POST /api/enroll, GET /api/admin/enrollments
app.use('/api/admin', adminRoutes);     // POST /api/admin/login, GET/POST/PATCH/DELETE /api/admin/api-keys
app.use('/api/chat', chatRoutes);       // POST /api/chat, DELETE /api/chat/:sessionId

app.get('/', (req, res) => res.send('Mazain Solution API is running'));

app.use(errorHandler); // must be registered after all routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));