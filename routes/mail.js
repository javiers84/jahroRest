const { Router } = require('express');
const email = require('../config/mail')

const router = Router();

router.post('/enviar',
    email.sendMail()
);

module.exports = router;