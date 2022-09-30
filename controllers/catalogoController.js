const { response } = require('express');

const catalogo = require('../models/catalogoModel');

///////// AGREGAR CATALOGO ///////////////
const agregarCatalogo = async(req, res = response) => {


    var catalogoAdd = new catalogo();
    var catalogoPdf = req.body.catalogoPdf;

    var fs = require("fs");
    var nombreArchivo = Math.random().toString() + ".html";
    catalogoAdd.catalogoPdf = "upload/" + nombreArchivo;

    fs.writeFile("public/upload/" + nombreArchivo, catalogoPdf, 'base64', (error) => {
        productoAdd.save((error, respuesta) => {
            if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
            catalogoAdd.catalogoPdf = "upload/" + nombreArchivo;
            res.send({ estado: { codigo: 1, respuesta: "operacion agregar producto exitosa " }, productos: respuesta });
        });
    });

    //     catalogoAdd.save((error, respuesta) => {
    //     if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
    //     res.send({ estado: { codigo: 0, respuesta: "operacion agregar catalogo exitosa " }, catalogo: respuesta });
    // });
}

///////// BUSCAR CATALOGOS ////////////////
const buscarCatalogos = async(req, res = response) => {


    catalogo.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, catalogo: respuesta });
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
        if (req.body.catalogoPdf != "") {
            var catalogoPdf = req.body.catalogoPdf;
            var fs = require("fs");
            var nombreArchivo = Math.random().toString() + ".html";
            retorno.catalogoPdf = "upload/" + nombreArchivo;

            fs.writeFile("public/upload/" + nombreArchivo, catalogoPdf, 'base64', (error) => {
                retorno.save((error, respuesta) => {
                    if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                    retorno.catalogoPdf = "upload/" + nombreArchivo;
                    res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, catalogo: respuesta });
                });
            });
        }
    });






    catalogo.findById(req.params.id, (err, retorno) => {
        retorno.catalogoPdf = req.body.catalogoPdf;

        retorno.save((err, respuesta) => {
            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

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