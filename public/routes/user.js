const express = require("express")

const UserRouter = express.Router()

const User = require('../schemas/User-schema');

UserRouter.post("/", async (req,res)=>{
  
    const { Nombre, Correo, Apellidos, Contraseña } = req.body;


    const newUser = new User({ Nombre, Correo, Apellidos, Contraseña});
    await newUser.save();

    return res.send("Usuario Registrado");
    

});

   

module.exports = UserRouter;