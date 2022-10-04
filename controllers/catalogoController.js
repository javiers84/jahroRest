const { response } = require('express');

const catalogo = require('../models/catalogoModel');

///////// AGREGAR CATALOGO ///////////////
const agregarCatalogo = async(req, res = response) => {

    var catalogoAdd = new catalogo();
    catalogoAdd.catalogoPdf = req.body.catalogoPdf;

    catalogoAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion agregar catalogo exitosa " }, catalogo: respuesta });
    });
}

///////// BUSCAR CATALOGOS ////////////////
const buscarCatalogos = async(req, res = response) => {


    catalogo.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.json({
            ok: true,
            msg: 'catalogo encontrado',
            respuesta
        });
        // res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, catalogo: respuesta });
    });

}

///////// BUSCAR CATALOGO ////////////////
// const buscarCatalogo = async(req, res = response) => {
//     const { id } = req.params;
//     try {
//         const catalogo = await catalogo.findById(id);
//         res.json({
//             ok: true,
//             msg: 'Catalogo encontrado',
//             catalogo
//         });
//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             msg: 'Hable con el Administrador'
//         });
//     }
// }

///////// ACTUALIZAR CATALOGO ////////////////
const actualizarCatalogo = async(req, res = response) => {

    catalogo.findById(req.params.id, (err, retorno) => {
        retorno.catalogoPdf = req.body.catalogoPdf;

        retorno.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar catalogo exitosa " }, catalogo: respuesta });
        });
    });

}

///////// ELIMINAR CATALOGO ////////////////
const eliminarCatalogo = async(req, res = response) => {


    catalogo.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {

            var urlCatalogo = retorno.catalogoPdf;
            console.log('url de la imagen ' + urlCatalogo);
            var urlString = urlCatalogo.toString;
            var fs = require("fs");
            try {
                fs.unlinkSync("public/" + urlCatalogo);
                console.log('Archivo eliminado');
            } catch (err) {
                console.error('Ocurrio un error al eliminar el archivo', err);
            }

            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar catalogo exitosa " }, catalogo: respuesta });
        });
    });
}

module.exports = {
    agregarCatalogo,
    buscarCatalogos,
    actualizarCatalogo,
    eliminarCatalogo
}