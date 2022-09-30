const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCatalogo, buscarCatalogos, actualizarCatalogo, eliminarCatalogo } = require('../controllers/catalogoController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR CATALOGO ///////////////
router.post('/agregarCatalogo', [
    check('catalogoPdf', 'El nombre es obligatorio').not().isEmpty(),
], validarCampos, agregarCatalogo);

////// BUSCAR CATALOGO ////////////////
router.get('/buscarCatalogos', buscarCatalogos);

////// ACTUALIZAR CATALOGO ///////////////
router.put('/actualizarCatalogo/:id', actualizarCatalogo);

////// ELIMINAR CATALOGO ///////////////
router.delete('/eliminarCatalogo/:id', eliminarCatalogo);

module.exports = router;