const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
    Nombre : String,
    Correo : String,
    Apellidos : String,
    Contraseña : String
  }); 

  const UserModel = mongoose.model("User",userSchema);

  module.exports = UserModel;

