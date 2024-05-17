const mongoose = require('mongoose'); 


const fileSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
});


const anuncioSchema = mongoose.Schema({
    Ciudad : String,
    Tipo : String,
    NumeroHab : String,
    NumeroBan : String,
    Area : Number,
    Descripcion : String, 
    Precio : Number,
    IdCreador : String,
    files: [fileSchema]
    }
  ); 

  const AnuncioModel = mongoose.model("Anuncio",anuncioSchema);

  module.exports = AnuncioModel;

