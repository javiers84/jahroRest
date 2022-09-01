const { response } = require('express');
const nodemailer = require('nodemailer');

const mail = require('../models/mailModel');

//////// CREAR TRANSPORTER
const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "812052db28ed5c",
            pass: "c89f683e85f025"
        }
    });
    return transport;
}

//////// ENVIAR MAIL
const enviarMail = async(req, res = response) => {
    const { nombre, apellido, correo, telefono, consulta } = req.body;
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: correo,
        to: 'makako84@gmail.com',
        subject: 'Hello ✔',
        // text: "mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + mensaje,
        html: "<h1>Hola</h1><p>mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + consulta + "</p>"
    });

    console.log('Message sent: %s', info.messageId);

    return
}

module.exports = {
    enviarMail
}