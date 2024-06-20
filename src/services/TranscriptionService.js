const fs = require('fs');
const speech = require('@google-cloud/speech');
const config = require('../config/config');

const client = new speech.SpeechClient({
  keyFilename: config.googleApplicationCredentials,
});

exports.transcribe = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);

  const [response] = await client.recognize({
    audio: {
      content: fileContent.toString('base64'), // Encode file content to base64
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 48000,
      languageCode: 'es-AR',
    },
  });

  return response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
};