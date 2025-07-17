// server/app.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// server/app.js
app.use('/api/admin', require('./routes/admin.routes'));
// server/app.js
app.use('/api/user', require('./routes/user.routes'));
// server/app.js
app.use('/api/owner', require('./routes/owner.routes'));


app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

// TODO: Add admin/user/owner routes here

module.exports = app;
