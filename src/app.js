import fs from 'node:fs';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config.js';
import cors from 'cors';
import TranscribeRoutes from './routes/TrascribeRoutes.js';
import SignService from './services/SignService.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/api', TranscribeRoutes);

app.listen(config.port, async () => {
  console.log(`Running server on port ${config.port}`);
  console.log('Will initialize ollama model. Make sure to set up the OLLAMA_HOST variable');
  await SignService.setupOllamaModel();
  console.log('Model up and running with name:', config.ollamaModel)
});
