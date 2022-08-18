const { response } = require('express');

const novedades = require('../models/novedadesModel');

/////// AGREGAR NOVEDAD
const agregarNovedad = async(req, res = response) => {


    var miObjetoAdd = new novedades();
    miObjetoAdd.titulo = req.body.titulo;
    miObjetoAdd.informacion1 = req.body.informacion1;
    miObjetoAdd.informacion2 = req.body.informacion2;
    miObjetoAdd.descripcion1 = req.body.descripcion1;
    miObjetoAdd.descripcion2 = req.body.descripcion2;

    if (req.body.imagen != "" && req.body.imagenDet1 != null && req.body.imagenDet2 != null) {
        var imagen = req.body.imagen;
        var imagenDet1 = req.body.imagenDet1;
        var imagenDet2 = req.body.imagenDet2;
        var fs = require("fs");
        var nombreArchivo = Math.random().toString() + ".jpg";
        var nombreArchivoDet1 = Math.random().toString() + ".jpg";
        var nombreArchivoDet2 = Math.random().toString() + ".jpg";
        miObjetoAdd.imagen = "upload/" + nombreArchivo;
        miObjetoAdd.imagenDet1 = "upload/" + nombreArchivoDet1;
        miObjetoAdd.imagenDet2 = "upload/" + nombreArchivoDet2;

        fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
            fs.writeFile("public/upload/" + nombreArchivoDet1, imagenDet1, 'base64', (error) => {
                fs.writeFile("public/upload/" + nombreArchivoDet2, imagenDet2, 'base64', (error) => {
                    miObjetoAdd.save((error, respuesta) => {
                        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                        miObjetoAdd.imagen = "upload/" + nombreArchivo;
                        miObjetoAdd.imagenDet1 = "upload/" + nombreArchivoDet1;
                        miObjetoAdd.imagenDet2 = "upload/" + nombreArchivoDet2;
                        res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                    });
                });
            });
        });
    }
}

/////// BUSCAR NOVEDAD
const buscarNovedad = async(req, res = response) => {

    novedades.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar novedades por id exitosa " }, novedades: retorno });

    });
}

/////// BUSCAR NOVEDAD
const buscarNovedades = async(req, res = response) => {


    novedades.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todas las novedades exitosa" }, novedades: respuesta });
    });
}

////// ACTUALIZAR NOVEDAD
const actualizarNovedad = async(req, res = response) => {


    novedades.findById(req.params.id, (err, retorno) => {
        retorno.titulo = req.body.titulo;
        retorno.informacion1 = req.body.informacion1;
        retorno.informacion2 = req.body.informacion2;
        retorno.descripcion1 = req.body.descripcion1;
        retorno.descripcion2 = req.body.descripcion2;
        // retorno.imagen = req.body.imagen;
        // retorno.imagenDet1 = req.body.imagenDet1;
        // retorno.imagenDet2 = req.body.imagenDet2;

        if (req.body.imagen != "" && req.body.imagenDet1 != null && req.body.imagenDet2 != null) {
            var imagen = req.body.imagen;
            var imagenDet1 = req.body.imagenDet1;
            var imagenDet2 = req.body.imagenDet2;
            var fs = require("fs");
            var nombreArchivo = Math.random().toString() + ".jpg";
            var nombreArchivoDet1 = Math.random().toString() + ".jpg";
            var nombreArchivoDet2 = Math.random().toString() + ".jpg";
            retorno.imagen = "upload/" + nombreArchivo;
            retorno.imagenDet1 = "upload/" + nombreArchivoDet1;
            retorno.imagenDet2 = "upload/" + nombreArchivoDet2;

            fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
                fs.writeFile("public/upload/" + nombreArchivoDet1, imagenDet1, 'base64', (error) => {
                    fs.writeFile("public/upload/" + nombreArchivoDet2, imagenDet2, 'base64', (error) => {
                        retorno.save((error, respuesta) => {
                            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                            retorno.imagen = "upload/" + nombreArchivo;
                            retorno.imagenDet1 = "upload/" + nombreArchivoDet1;
                            retorno.imagenDet2 = "upload/" + nombreArchivoDet2;
                            res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                        });
                    });
                });
            });
        }
    });
}

/////// ELIMINAR NOVEDAD
const eliminarNovedad = async(req, res = response) => {


    novedades.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {
            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar novedad exitosa " }, novedades: respuesta });
        });
    });
}

module.exports = {
    agregarNovedad,
    buscarNovedad,
    buscarNovedades,
    actualizarNovedad,
    eliminarNovedad
}