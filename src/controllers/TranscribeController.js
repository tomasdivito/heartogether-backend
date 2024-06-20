const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const TranscriptionService = require('../services/TranscriptionService');

exports.transcribeAudio = async (req, res) => {
  console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const linear16Path = filePath.replace(path.extname(filePath), '.wav');

  ffmpeg(filePath)
    .toFormat('wav')
    .audioCodec('pcm_s16le')
    .on('end', async () => {
      try {
        const transcription = await TranscriptionService.transcribe(linear16Path);
        res.send(`Transcription: ${transcription}`);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during transcription' });
      } finally {
        fs.unlinkSync(filePath);
        fs.unlinkSync(linear16Path);
      }
    })
    .on('error', (error) => {
      console.error('ffmpeg error:', error);
      res.status(500).json({ error: 'An error occurred during audio conversion' });
    })
    .save(linear16Path);
};
