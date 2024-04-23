const express = require("express");
const bcrypt = require('bcrypt');
const AnuncioRouter = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const AnuncioModel = require("../schemas/Anuncio-schema");
const { default: mongoose, Schema } = require("mongoose");

AnuncioRouter.post("/NuevoAnuncio", async (req,res)=>{

    const { Ciudad, Tipo, NumeroHabs, NumeroBan, Area, Descripcion, Precio }= req.body;

    if ( !Ciudad  || !Tipo || !NumeroHabs || !NumeroBan || !Area || !Descripcion || !Precio ){
        return res.status(400).send("No se permiten campos vacios");
    }

    const newAnuncio = new AnuncioModel ({Ciudad, Tipo, NumeroHabs, NumeroBan, Area, Descripcion, Precio});
    await newAnuncio.save();

    return res.send("Anuncio publicado");
});

AnuncioRouter.get("/busqueda",async (req,res)=>{

    try {
    const {ciudad} = req.query;

    if(!ciudad){
        return res.status(400).json({error:'No se ha proporcionado la ciudad'});
    }

    const Resultado = await AnuncioModel.find({Ciudad:ciudad});
    res.json(Resultado);
   

} catch (error) {
    // Si ocurre algún error durante la ejecución, lo manejamos aquí
    console.error("Error en la consulta:", error);
    return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
}

});

module.exports = AnuncioRouter;