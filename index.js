//importando las librerias que se han instalado para el proyecto
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

//estableciendo las variables
const PORT = 3000;
const expressApp = express();

//estableciendo directorio de archivos estaticos
expressApp.use(express.static(path.join(__dirname, 'public')));

//Levantando el servidor 
expressApp.listen(PORT, () =>
    console.log(`Servidor levantado en el puerto ${PORT}`)
);