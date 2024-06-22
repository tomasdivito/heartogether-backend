# Hear Together API

Repo oficial del backend de Hear Together

# Requesitivos
- Node v20

### How to run
- Crear un archivo `.env` en la raiz del proyecto usando como ejemplo `.env.example`
  - `cp .env.example .env` 
- Instalar dependencias
  - `npm install`
- Instalar ffmpeg
  - [Windows](https://www.gyan.dev/ffmpeg/builds/)
  - [Others](https://ffmpeg.org/download.html)

- Instalar [Ollama](https://github.com/ollama/ollama)
  - Correr `ollama pull llama3` para tener `llama3` instalado (al momento es el que estamos utilizando pero se deberia tener el modelo en base a `/src/model/modelfile` que contiene la prompt de sistema del modelo de lenguaje).

and run the project

```
npm start
```

(Si se esta desarrollando, recordar setear la variable de entorno de la app para que apunte al server que estan corriendo)

# Google Cloud Setup

Para que el backend funcione correctamente necesitaran un archivo `heartogether-key.json`
Deberan setear la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` con el path al archivo
en el `.env`