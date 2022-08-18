const { response } = require('express');
const nodemailer = require('nodemailer');

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

const sendMail = async(req, res = response) => {

    const { nombre, apellido, correo, telefono, mensaje } = req.body;
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: correo,
        to: 'makako84@gmail.com',
        subject: 'Hello ✔',
        // text: "mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + mensaje,
        html: "<h1>Hola</h1><p>mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + mensaje + "</p>"
    });

    console.log('Message sent: %s', info.messageId);

    return
}

exports.sendMail = () => sendMail;