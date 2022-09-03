const { response } = require('express');

const publicidad = require('../models/publicidadesModel');

/////// AGREGAR PUBLICIDAD
const agregarPublicidad = async(req, res = response) => {

    var miObjetoAdd = new publicidad();
    miObjetoAdd.titulo = req.body.titulo;
    miObjetoAdd.informacion = req.body.informacion;

    if (req.body.imagen != "" && req.body.imagenDet != null) {
        var imagen = req.body.imagen;
        var imagenDet = req.body.imagenDet;
        var fs = require("fs");
        var nombreArchivo = Math.random().toString() + ".jpg";
        var nombreArchivoDet = Math.random().toString() + ".jpg";
        miObjetoAdd.imagen = "upload/" + nombreArchivo;
        miObjetoAdd.imagenDet = "upload/" + nombreArchivoDet;

        fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
            fs.writeFile("public/upload/" + nombreArchivoDet, imagenDet, 'base64', (error) => {
                miObjetoAdd.save((error, respuesta) => {
                    if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                    miObjetoAdd.imagen = "upload/" + nombreArchivo;
                    miObjetoAdd.imagenDet = "upload/" + nombreArchivoDet;
                    res.send({ estado: { codigo: 1, respuesta: "operacion agregar publicidad exitosa " }, publicidades: respuesta });
                });
            });
        });
    }
}

/////// BUSCAR PUBLICIDAD
const buscarPublicidad = async(req, res = response) => {

    publicidad.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar publicidad por id exitosa " }, publicidades: retorno });

    });
}

/////// BUSCAR PUBLICIDADES
const buscarPublicidades = async(req, res = response) => {


    publicidad.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todas las publicidades exitosa" }, publicidades: respuesta });
    });
}

/////// ACTUALIZAR PUBLICIDAD

const actualizarPublicidad = async(req, res = response) => {


    publicidad.findById(req.params.id, (err, retorno) => {
        retorno.titulo = req.body.titulo;
        retorno.informacion = req.body.informacion;

        if (req.body.imagen != "" && req.body.imagenDet != null) {
            var imagen = req.body.imagen;
            var imagenDet = req.body.imagenDet;
            var fs = require("fs");
            var nombreArchivo = Math.random().toString() + ".jpg";
            var nombreArchivoDet = Math.random().toString() + ".jpg";
            retorno.imagen = "upload/" + nombreArchivo;
            retorno.imagenDet = "upload/" + nombreArchivoDet;

            fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
                fs.writeFile("public/upload/" + nombreArchivoDet, imagenDet, 'base64', (error) => {
                    retorno.save((error, respuesta) => {
                        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                        retorno.imagen = "upload/" + nombreArchivo;
                        retorno.imagenDet = "upload/" + nombreArchivoDet;
                        res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                    });
                });
            });
        }
    });
}

/////// ELIMINAR PUBLICIDAD
const eliminarPublicidad = async(req, res = response) => {

    publicidad.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {
            var urlImagen = retorno.imagen;
            var urlImagenDet = retorno.imagenDet;
            var fs = require("fs");
            try {
                fs.unlinkSync("public/" + urlImagen);
                fs.unlinkSync("public/" + urlImagenDet);
                console.log('Archivos eliminados');
            } catch (err) {
                console.error('Ocurrio un error al eliminar el archivo', err);
            }

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar publicidad exitosa " }, publicidades: respuesta });
        });
    });
}


module.exports = {
    agregarPublicidad,
    buscarPublicidad,
    buscarPublicidades,
    actualizarPublicidad,
    eliminarPublicidad
}