const fs = require('node:fs');
const express = require('express');
const config = require('./config/config');
const TranscribeRoutes = require('./routes/TrascribeRoutes');

const app = express();

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/api', TranscribeRoutes);

app.listen(config.port, () => {
  console.log(`Running server on port ${config.port}`);
});
