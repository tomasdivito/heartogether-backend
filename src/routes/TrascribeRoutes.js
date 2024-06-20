const express = require('express');
const multer = require('multer');
const path = require('path');
const TranscribeController = require('../controllers/TranscribeController');

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

module.exports = router;
