const { Router } = require('express');
const { check } = require('express-validator');
const { agregarPublicidad, buscarPublicidad, buscarPublicidades, actualizarPublicidad, eliminarPublicidad } = require('../controllers/publicidadController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR PUBLICIDAD ///////////////
router.post('/agregarPublicidad', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('informacion', 'La informacion es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet', 'La imagen es obligatoria').not().isEmpty()
], validarCampos, agregarPublicidad);

////// BUSCAR PUBLICIDAD ///////////////
router.get('/buscarPublicidad/:id', buscarPublicidad);

////// BUSCAR PUBLICIDADES ///////////////
router.get('/buscarPublicidades', buscarPublicidades);

////// ACTUALIZAR PUBLICIDAD ///////////////
router.put('/actualizarPublicidad/:id', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('informacion', 'La informacion es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet', 'La imagen es obligatoria').not().isEmpty()
], actualizarPublicidad);

////// ELIMINAR PUBLICIDAD ///////////////
router.delete('/eliminarPublicidad/:id', eliminarPublicidad);

module.exports = router;