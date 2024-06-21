import fs from 'node:fs';
import express from 'express';
import config from './config/config.js';
import TranscribeRoutes from './routes/TrascribeRoutes.js';

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
