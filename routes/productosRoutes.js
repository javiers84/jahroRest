const { Router } = require('express');
const { check } = require('express-validator');
const { agregarProducto, buscarProducto, buscarProductos, actualizarProducto, eliminarProducto } = require('../controllers/productosController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR PRODUCTO ///////////////
router.post('/agregarProducto', [
    check('imagen', 'La imagen es obligatoria').not().isEmpty()
], validarCampos, agregarProducto);

////// BUSCAR PRODUCTO ///////////////
router.get('/buscarProducto/:id', buscarProducto);

////// BUSCAR PRODUCTOS ///////////////
router.get('/buscarProductos', buscarProductos);

////// ACTUALIZAR PRODUCTO ///////////////
router.put('/actualizarProducto/:id', [
    check('imagen', 'La imagen es obligatoria').not().isEmpty()
], actualizarProducto);

////// ELIMINAR PRODUCTO ///////////////
router.delete('/eliminarProducto/:id', eliminarProducto);

module.exports = router;