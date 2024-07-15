import fs from 'node:fs';
import speech from '@google-cloud/speech';
import config from '../config/config.js'
import SignService from './SignService.js';

const client = new speech.SpeechClient({
  keyFilename: config.googleApplicationCredentials,
});

const transcribe = async (filePath) => {
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

  // Getting the first of the alternatives.
  const alternative = response.result.alternatives[0];

  const signedResponse = await SignService.interpret(alternative.transcript);
  return {
    transcription: alternative.transcript,
    signs: signedResponse,
  };
};

export default {
  transcribe,
};
