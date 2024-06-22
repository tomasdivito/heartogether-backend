import express from 'express';
import multer from 'multer';
import path from 'node:path';
import TranscribeController from '../controllers/TranscribeController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/transcribe', upload.single('audio'), TranscribeController.transcribeAudio);
router.post('/interpret', TranscribeController.interpret);

export default router;