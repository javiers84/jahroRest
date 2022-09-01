const { Router } = require('express');
const email = require('../config/mail')
    // const { check } = require('express-validator');
    // const { validarCampos } = require('../middlewares/validar-campos');

// const { enviarMail } = require('../controllers/mailController');

const router = Router();

// router.post('/enviar', [
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     validarCampos
// ], enviarMail);

router.post('/enviar',
    email.sendMail()
);

module.exports = router;