//importando las librerias que se han instalado para el proyecto
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');


dotenv.config();

//estableciendo las variables
const PORT = process.env.PORT;
const expressApp = express();

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

//conectadonse a la base de datos
mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.bu6gnd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Connected to MongoDB database!');
})
.catch((error) => {
    console.error('Connection failed:', error);
});

expressApp.use(cors({ origin: '*' }));
   expressApp.use(bodyParser.json());
   expressApp.use(express.static('public'));
   expressApp.use(express.json());

const userModel = require('./schemas/User-schema');

expressApp.post("/registro", async (req,res)=>{
  
    const { Nombre, Correo, Apellidos, Contraseña } = req.body;


    const newUser = new userModel({ Nombre, Correo, Apellidos, Contraseña});
    await newUser.save();

    return res.send("Usuario Registrado");
    

});

   expressApp.use(function (err, req, res, next) {
       res.status(422).send({ error: err.message });
   });

//Levantando el servidor 
expressApp.listen(PORT, () =>
    console.log(`Servidor levantado en el puerto ${PORT}`)
);