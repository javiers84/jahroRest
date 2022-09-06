const { response } = require('express');
const nodemailer = require('nodemailer');
const nodemailerSendGrid = require('nodemailer-sendgrid');

const createTrans = () => {
    // const transport = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //     user: "812052db28ed5c",
    //     pass: "c89f683e85f025"
    // }
    const transport = nodemailer.createTransport(
        nodemailerSendGrid({
            apiKey: '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'
        })
    );
    // });
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