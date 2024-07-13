import { Ollama } from 'ollama';
import config from '../config/config.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { JsonOutputParser } from '@langchain/core/output_parsers'

const ollama = new Ollama({ host: config.ollamaHost });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = fs.readFileSync(path.join(__dirname, '../model/model_v2'), 'utf-8');
const parser = new JsonOutputParser();

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
    console.log('model response:',response);
  } catch (error) {
    console.log('Error testing ollama:', error);
  }
  console.log(typeof response.message.content);
  const jsonMatch = response.message.content.match(/\[.*\]/s);

  if (!jsonMatch[0]) {
    console.log('no json match');
    return { error: 'no json match was found' };
  }
  const parsed = await parser.parse(jsonMatch[0]);
  console.log('parsed?:',parsed);
  return parsed;
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
