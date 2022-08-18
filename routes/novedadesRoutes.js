const { Router } = require('express');
const { check } = require('express-validator');
const { agregarNovedad, buscarNovedad, buscarNovedades, actualizarNovedad, eliminarNovedad } = require('../controllers/novedadesController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

////// AGREGAR NOVEDAD ///////////////
router.post('/agregarNovedad', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('informacion1', 'La informacion es obligatoria').not().isEmpty(),
    check('informacion2', 'La informacion es obligatoria').not().isEmpty(),
    check('descripcion1', 'La descripcion es obligatoria').not().isEmpty(),
    check('descripcion2', 'La descripcion es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet1', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet2', 'La imagen es obligatoria').not().isEmpty()
], validarCampos, agregarNovedad);

////// BUSCAR NOVEDAD ///////////////
router.get('/buscarNovedad/:id', buscarNovedad);

////// BUSCAR NOVEDADES ///////////////
router.get('/buscarNovedades', buscarNovedades);

////// ACTUALIZAR NOVEDAD ///////////////
router.put('/actualizarNovedad/:id', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('informacion1', 'La informacion es obligatoria').not().isEmpty(),
    check('informacion2', 'La informacion es obligatoria').not().isEmpty(),
    check('descripcion1', 'La descripcion es obligatoria').not().isEmpty(),
    check('descripcion2', 'La descripcion es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet1', 'La imagen es obligatoria').not().isEmpty(),
    check('imagenDet2', 'La imagen es obligatoria').not().isEmpty()
], actualizarNovedad);

////// ELIMINAR NOVEDAD ///////////////
router.delete('/eliminarNovedad/:id', eliminarNovedad);

module.exports = router;