# Hear Together API

Repo oficial del backend de Hear Together

# Requesitivos
- Node v20

### How to run
- Crear un archivo `.env` en la raiz del proyecto usando como ejemplo `.env.example`
- Instalar dependencias
```
$ npm install
```

and run the project

```
npm start
```

(Si se esta desarrollando, recordar setear la variable de entorno de la app para que apunte al server que estan corriendo)

# Google Cloud Setup

Para que el backend funcione correctamente necesitaran un archivo `heartogether-key.json`
Deberan setear la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` con el path al archivo
en el `.env`