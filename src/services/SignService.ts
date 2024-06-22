import { Ollama } from 'ollama';

const ollama = new Ollama({ host: '192.168.0.121:11434' })

const testOllama = async () => {
  console.log('trying to test ollama');
  let response = await ollama.chat({
    stream: false,
    model: 'llama3',
    messages:[{
      role: 'user',
      content: 'whats the token limit now?',
    }],
  });
  console.log(response);
};

export default {
  testOllama,
};
