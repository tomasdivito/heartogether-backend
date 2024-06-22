import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  googleApplicationCredentials: path.join(__dirname, '../../', process.env.GOOGLE_APPLICATION_CREDENTIALS),
  port: process.env.PORT || 8001
};
