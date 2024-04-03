const mongoose = require('mongoose'); 

const anuncioSchema = mongoose.Schema({
    Ciudad : String,
    Tipo : String,
    NumeroHabs : String,
    NumeroBan : String,
    Area : Number,
    Descripcion : String, 
    Precio : Number,
  }); 

  const AnuncioModel = mongoose.model("Anuncio",anuncioSchema);

  module.exports = AnuncioModel;

