const express = require("express");
const bcrypt = require('bcrypt');
const UserRouter = express.Router();
const jwt = require('jsonwebtoken');

const UserModel = require('../schemas/User-schema');

UserRouter.get('/:_id',async(req,res)=>{
    const { _id } = req.params;
    const user = await UserModel.findById(_id).exec();

    if (!user) return res.status(404).send();

    return res.send(user);
});

//Crear una nueva cuenta 
UserRouter.post("/registro", async (req,res)=>{
  
    const { Nombre, Correo, Apellidos, Contraseña } = req.body;
    
    if (!Nombre || !Correo || !Apellidos || !Contraseña) {
        return res.status(400).send('No se permiten campos vacíos');
      }
    
    //si el correo ya se uso no deja registrar
    const user = await UserModel.findOne({Correo}).exec();
    if (user) {
        return res.status(409).send('El usuario ya se encuentra registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    const newUser = new UserModel({ Nombre, Correo, Apellidos, Contraseña: hashedPassword });
    await newUser.save();

    return res.send("Usuario Registrado");
    

});

UserRouter.post('/login', async (req, res) => {

    const { Correo, Contraseña } = req.body;

    const user = await UserModel.findOne({Correo});
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        const passwordMatch = await bcrypt.compare(Contraseña, user.Contraseña);
        if (!passwordMatch) {
            return res.status(401).send('Contraseña inválida');
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(200).json({ token });
    
});

module.exports = UserRouter;