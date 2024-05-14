const express = require("express");
const bcrypt = require('bcrypt');
const AnuncioRouter = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

const upload = multer({ dest: 'uploads/'});

const AnuncioModel = require("../schemas/Anuncio-schema");
const { default: mongoose, Schema } = require("mongoose");
const { error } = require("console");

AnuncioRouter.post("/NuevoAnuncio", upload.array('files',3), async (req,res)=>{

    console.log("Datos del formulario recibidos:", req.body);

    const { Ciudad, Tipo, NumeroHab, NumeroBan, Area, Descripcion, Precio, IdCreador } = req.body;

    if (!Ciudad || !Tipo || !NumeroHab || !Area || !Descripcion || !Precio || !IdCreador) {
        console.log(Ciudad,Tipo,NumeroBan,NumeroHab,Area,Descripcion,Precio,IdCreador);
        return res.status(400).send("No se permiten campos vacíos");
    }
    
    if (!req.file) {
        return res.status(400).send("No se proporcionó una imagen");
    }

    const newAnuncio = new AnuncioModel({

        Ciudad,
        Tipo, 
        NumeroHab, 
        NumeroBan, 
        Area, 
        Descripcion,  
        Precio, 
        IdCreador, 
        ruta: req.file.path
    })
    try{
        await newAnuncio.save();
        return res.send('Anuncio publicado');
    } catch (error) {
        console.error('Error al guardar el anuncio', error);
        return res.status(500).send("Error interno");
    }
    

});

AnuncioRouter.get("/busqueda",async (req,res)=>{

    try {
    const {ciudad} = req.query;

    if(!ciudad){
        return res.status(400).json({error:'No se ha proporcionado la ciudad'});
    }

    const Resultado = await AnuncioModel.find({Ciudad:ciudad});
    res.render('busqueda', { Resultado:Resultado });
    console.log(Resultado);

} catch (error) {
    // Si ocurre algún error durante la ejecución, lo manejamos aquí
    console.error("Error en la consulta:", error);
    return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
}

});

module.exports = AnuncioRouter;