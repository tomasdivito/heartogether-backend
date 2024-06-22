import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  googleApplicationCredentials: path.join(__dirname, '../../', process.env.GOOGLE_APPLICATION_CREDENTIALS),
  ollamaModel: 'llama3-heartogether',
  ollamaHost: process.env.OLLAMA_HOST,
  port: process.env.PORT || 8001
};
