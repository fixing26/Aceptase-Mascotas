const express = require("express")

const UserRouter = express.Router()

const UserModel = require('../schemas/User-schema');

UserRouter.get('/:_id',async(req,res)=>{
    const { _id } = req.params;
    const user = await User.findById(_id).exec();

    if (!user) return res.status(404).send();

    return res.send(user);
});

//Crear una nueva cuenta 
UserRouter.post("/", async (req,res)=>{
  
    const { Nombre, Correo, Apellidos, Contraseña } = req.body;
    
    if (!Nombre || !Correo || !Apellidos || !Contraseña) {
        return res.status(400).send('No se permiten campos vacíos');
      }
    
    //si el correo ya se uso no deja registrar
    const user = await UserModel.findOne({Correo}).exec();
    if (user) {
        return res.status(409).send('El usuario ya se encuentra registrado');
    }
    const newUser = new UserModel({ Nombre, Correo, Apellidos, Contraseña});
    await newUser.save();

    return res.send("Usuario Registrado");
    

});

   

module.exports = UserRouter;