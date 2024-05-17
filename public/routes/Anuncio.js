const express = require("express");
const bcrypt = require('bcrypt');
const AnuncioRouter = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  

const AnuncioModel = require("../schemas/Anuncio-schema");
const { default: mongoose, Schema } = require("mongoose");
const { error } = require("console");

AnuncioRouter.post("/NuevoAnuncio", upload.array('files',3), async (req,res)=>{

    console.log("Datos del formulario recibidos:", req.body);

    const { Ciudad, Tipo, NumeroHab, NumeroBan, Area, Descripcion, Precio, IdCreador } = req.body;

    if (!Ciudad || !Tipo || !NumeroHab || !NumeroBan || !Area || !Descripcion || !Precio || !IdCreador) {
        console.log(Ciudad,Tipo,NumeroBan,NumeroHab,Area,Descripcion,Precio,IdCreador);
        return res.status(400).send("No se permiten campos vacíos");
    }
    
    const files = req.files

    if (!files) {
        console.log(files)
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
        files
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

//metodo para buscar anuncios segun id del creador
AnuncioRouter.get("/MisAnuncios",async (req,res)=>{

    try {
    const {IdCreador} = req.query;

    if(!IdCreador){
        return res.status(400).json({error:'Error interno'});
    }

    const Resultado = await AnuncioModel.find({IdCreador:IdCreador});
    res.render('misanuncios', { Resultado:Resultado });
    console.log(Resultado);

} catch (error) {
    // Si ocurre algún error durante la ejecución, lo manejamos aquí
    console.error("Error en la consulta:", error);
    return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
}

});

//metodo para eliminar anuncios segun id del anuncio
AnuncioRouter.delete("/EliminarAnuncio", async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ error: 'No se ha proporcionado el ID del anuncio' });
        }

        const resultado = await AnuncioModel.findByIdAndDelete(_id);

        if (!resultado) {
            return res.status(404).json({ error: 'Anuncio no encontrado' });
        }

        return res.json({ mensaje: 'Anuncio eliminado correctamente' });

    } catch (error) {
        console.error("Error al eliminar el anuncio:", error);
        return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
    }
});

module.exports = AnuncioRouter;