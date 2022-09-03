const { response } = require('express');

const productos = require('../models/productosModel');

/////// AGREGAR PRODUCTO
const agregarProducto = async(req, res = response) => {

    var productoAdd = new productos();

    if (req.body.imagen != "") {
        var imagen = req.body.imagen;
        var fs = require("fs");
        var nombreArchivo = Math.random().toString() + ".jpg";
        productoAdd.imagen = "upload/" + nombreArchivo;

        fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
            productoAdd.save((error, respuesta) => {
                if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                productoAdd.imagen = "upload/" + nombreArchivo;
                res.send({ estado: { codigo: 1, respuesta: "operacion agregar producto exitosa " }, productos: respuesta });
            });
        });
    }
}

///////// BUSCAR PRODUCTO
const buscarProducto = async(req, res = response) => {




    productos.findById(req.params.id, (err, retorno) => {

        if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });
        res.send({ estado: { codigo: 1, respuesta: "operacion buscar productos por id exitosa " }, productos: retorno });

    });
}

///////// BUSCAR PRODUCTOS
const buscarProductos = async(req, res = response) => {

    productos.find({}, (error, respuesta) => {

        if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
        res.send({ estado: { codigo: 1, respuesta: "Operacion buscar todos los productos exitosa" }, productos: respuesta });
    });
}

/////// ACTUALIZAR PRODUCTO
const actualizarProducto = async(req, res = response) => {

    productos.findById(req.params.id, (err, retorno) => {
        if (req.body.imagen != "") {
            var imagen = req.body.imagen;
            var fs = require("fs");
            var nombreArchivo = Math.random().toString() + ".jpg";
            retorno.imagen = "upload/" + nombreArchivo;

            fs.writeFile("public/upload/" + nombreArchivo, imagen, 'base64', (error) => {
                retorno.save((error, respuesta) => {
                    if (error) res.send({ estado: { codigo: 0, respuesta: error.message } });
                    retorno.imagen = "upload/" + nombreArchivo;
                    res.send({ estado: { codigo: 1, respuesta: "operacion agregar novedad exitosa " }, novedades: respuesta });
                });
            });
        }
    });
}

/////// ELIMINAR PRODUCTO
const eliminarProducto = async(req, res = response) => {


    productos.findById(req.params.id, (err, retorno) => {

        retorno.remove((err, respuesta) => {
            var urlImagen = retorno.imagen;
            console.log('url de la imagen ' + urlImagen);
            var urlString = urlImagen.toString;
            var fs = require("fs");
            try {
                fs.unlinkSync("public/" + urlImagen);
                console.log('Archivo eliminado');
            } catch (err) {
                console.error('Ocurrio un error al eliminar el archivo', err);
            }
            if (err) res.send({ estado: { codigo: 0, respuesta: err.message } });

            res.send({ estado: { codigo: 1, respuesta: "operacion eliminar producto exitosa " }, productos: respuesta });
        });
    });
}

module.exports = {
    agregarProducto,
    buscarProducto,
    buscarProductos,
    actualizarProducto,
    eliminarProducto
}