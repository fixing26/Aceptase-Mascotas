const express = require("express");
const bcrypt = require('bcrypt');
const AnuncioRouter = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const AnuncioModel = require("../schemas/Anuncio-schema");

AnuncioRouter.post("/NuevoAnuncio", async (req,res)=>{

    const { Ciudad, Tipo, NumeroHabs, NumeroBan, Area, Descripcion, Precio }= req.body;

    if ( !Ciudad  || !Tipo || !NumeroHabs || !NumeroBan || !Area || !Descripcion || !Precio ){
        return res.status(400).send("No se permiten campos vacios");
    }

    const newAnuncio = new AnuncioModel ({Ciudad, Tipo, NumeroHabs, NumeroBan, Area, Descripcion, Precio});
    await newAnuncio.save();

    return res.send("Anuncio publicado");
});

module.exports = AnuncioRouter;