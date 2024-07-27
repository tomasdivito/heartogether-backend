import path from 'node:path';
import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import TranscriptionService from '../services/TranscriptionService.js';
import SignService from '../services/SignService.js';

const transcribeAudio = async (req, res) => {
  console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const linear16Path = filePath.replace(path.extname(filePath), '.wav');
  const fileExtension = path.extname(filePath).toLowerCase();

  console.log('fileExtension:', fileExtension);
  if (fileExtension === '.wav') {
    try {
      console.log('will avoid convertion to wav as we already have a wav file');
      const transcription = await TranscriptionService.transcribe(linear16Path);
      res.send(transcription);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred during transcription' });
    } finally {
      fs.unlinkSync(filePath);
    }

    return;
  }

  ffmpeg(filePath)
    .toFormat('wav')
    .audioCodec('pcm_s16le')
    .on('end', async () => {
      try {
        const transcription = await TranscriptionService.transcribe(linear16Path);
        res.send(transcription);
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

const interpret = async (req, res) => {
   const response = await SignService.interpret(req.body.transcription);
   res.status(200).send(response);
}

export default {
  transcribeAudio,
  interpret,
};
