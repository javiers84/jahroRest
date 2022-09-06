const { response } = require('express');
const nodemailer = require('nodemailer');

const createTrans = () => {
    const transport = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        // port: 2525,
        // auth: {
        //     user: "812052db28ed5c",
        //     pass: "c89f683e85f025"
        // }
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'makako84@gmail.com',
            pass: 'reyvaj++1984'
        }
    });
    return transport;
}

const sendMail = async(req, res = response) => {

    const { nombre, apellido, correo, telefono, consulta } = req.body;
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: `${correo}`,
        to: 'j_javier_m@hotmail.com',
        subject: 'Hello ✔',
        // text: "mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + mensaje,
        html: "<h1>Hola</h1><p>mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + `${consulta}` + "</p>"
    });

    console.log('Message sent: %s', info.messageId);

    return
}

exports.sendMail = () => sendMail;