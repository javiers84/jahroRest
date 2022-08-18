const { response } = require('express');

const catalogo = require('../models/catalogoModel');

///////// AGREGAR CATALOGO ///////////////
const agregarCatalogo = async(req, res = response) => {


    var miObjetoAdd = new catalogo();
    miObjetoAdd.catalogoPdf = req.body.catalogoPdf;

    miObjetoAdd.save((error, respuesta) => {
        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 0, respuesta: "operacion agregar catalogo exitosa " }, cupones: respuesta });
    });








    // const { nombre, descripcion, precio, imagen } = req.body;

    // const nuevoCatalogo = new catalogo({
    //     catalogoPdf
    // });

    // try {
    //     await nuevoCatalogo.save();
    //     res.json({
    //         ok: true,
    //         msg: 'Catalogo agregado',
    //         nuevoCatalogo
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el Administrador'
    //     });
    // }
}

///////// BUSCAR CATALOGOS ////////////////
const buscarCatalogos = async(req, res = response) => {


    catalogo.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los catalogos exitosa" }, cupones: respuesta });
    });








    // try {
    //     const catalogos = await catalogo.find();
    //     res.json({
    //         ok: true,
    //         msg: 'Catalogos encontrados',
    //         catalogos
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el Administrador'
    //     });
    // }
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

        retorno.save((err, respuesta) => {
            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion actualizar catalogo exitosa " }, cupones: respuesta });
        });
    });







    // const { id } = req.params;
    // const { catalogoPdf } = req.body;

    // try {
    //     const catalogo = await catalogo.findByIdAndUpdate(id, {
    //         catalogoPdf
    //     });
    //     res.json({
    //         ok: true,
    //         msg: 'Catalogo actualizado',
    //         catalogo
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el Administrador'
    //     });
    // }
}

///////// ELIMINAR CATALOGO ////////////////
const eliminarCatalogo = async(req, res = response) => {


    catalogo.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {
            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar catalogo exitosa " }, cupones: respuesta });
        });
    });








    // const { id } = req.params;
    // try {
    //     await catalogo.findByIdAndDelete(id);
    //     res.json({
    //         ok: true,
    //         msg: 'Catalogo eliminado'
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el Administrador'
    //     });
    // }
}

module.exports = {
    agregarCatalogo,
    buscarCatalogos,
    actualizarCatalogo,
    eliminarCatalogo
}