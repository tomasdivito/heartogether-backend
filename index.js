const express = require('express');
const multer = require('multer');
const speech = require('@google-cloud/speech');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');


const client = new speech.SpeechClient();

const app = express();
// Set up Multer to save files to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp and original extension
  }
});
const upload = multer({ storage });

app
  .post('/transcribe', upload.single('audio'), async (req, res) => {
    console.log('Received file:', req.file);

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const linear16Path = filePath.replace(path.extname(filePath), '.wav');

  // Convert the audio file to LINEAR16 format
  ffmpeg(filePath)
    .toFormat('wav')
    .audioCodec('pcm_s16le')
    .on('end', async () => {
      try {
        const fileContent = fs.readFileSync(linear16Path).toString('base64');

        // Construct audio recognition request
        const [response] = await client.recognize({
          audio: {
            content: fileContent, // Pass the base64-encoded file content to the API
          },
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 48000,
            languageCode: 'es-AR',
          },
        });

        // Extract transcription results
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');

        response.results.forEach(result => {
          console.log('result:', result);
          console.log('alternatives:');
          result.alternatives.forEach((alternative, index) => {
            console.log(`alternative ${index}: ${alternative.transcript}`);
          });
        });

        res.send(`Transcription: ${transcription}`);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during transcription' });
      } finally {
        // Clean up files
        fs.unlinkSync(filePath);
        fs.unlinkSync(linear16Path);
      }
    })
    .on('error', (error) => {
      console.error('ffmpeg error:', error);
      res.status(500).json({ error: 'An error occurred during audio conversion' });
    })
    .save(linear16Path);
  })
  .get('/', async (req, res) => {
  // The path to the remote LINEAR16 file
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  response.results.forEach(result => {
    console.log('result:', result);
    console.log('alternatives:');
    result.alternatives.forEach((alternative, index) => {
      console.log(`alternative ${index}: ${alternative.transcript}`)
    });
  });
  res.send(`${transcription}`);
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
