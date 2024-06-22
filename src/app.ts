/*(import fs from 'fs';
import express from 'express';
import config from './config/config';
import cors from 'cors';
import TranscribeRoutes from './routes/TrascribeRoutes';
*/

console.log('oh hi');
return;
const app = express();
app.use(cors());

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/api', TranscribeRoutes);

app.listen(config.port, () => {
  console.log(`Running server on port ${config.port}`);
});
