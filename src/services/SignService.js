import { Ollama } from 'ollama';
import config from '../config/config.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const ollama = new Ollama({ host: config.ollamaHost });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = fs.readFileSync(path.join(__dirname, '../model/modelfile'), 'utf-8');

const interpret = async (transcription) => {
  let response = '{}';
  try {
    console.log('trying to test ollama');
    response = await ollama.chat({
      stream: false,
      model: config.ollamaModel,
      messages:[{
        role: 'user',
        content: transcription,
      }],
    });
    console.log(response);
  } catch (error) {
    console.log('Error testing ollama:', error);
  }

  return JSON.parse(response.message.content);
};

const setupOllamaModel = async () => {
  try {
    const progress = await ollama.create({
      model: config.ollamaModel,
      modelfile: file,
    });
    console.log('progress done:', progress);
  } catch (error) {
    console.log('Error creating ollama model:', error);
  }
}

export default {
  interpret,
  setupOllamaModel,
};
