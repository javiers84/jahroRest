const { response } = require('express');
const nodemailer = require('nodemailer');


module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: gmail,
        auth: {
            user: 'makako84@gmail.com',
            pass: 'reyvaj++1984'
        }
    });

    const mailOption = {
        from: `${formulario.nombre} <${formulario.correo}>`,
        to: 'info@jahro.com.ar',
        subject: 'Consulta desde la AppWeb',
        html: `
            <strong>Nombre: </strong> ${formulario.nombre} <br/>
            <strong>Apellido: </strong> ${formulario.apellido} <br/>
            <strong>Telefono: </strong> ${formulario.telefono} <br/>
            <strong>Mensaje: </strong> ${formulario.consulta} <br/>
        `
    };

    transporter.sendMail(mailOption, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}




// const createTrans = () => {
//     const transport = nodemailer.createTransport({
//         service: 'gmail',
//         // host: "smtp.gmail.com",
//         // port: 2525,
//         auth: {
//             user: "makako84@gmail.com",
//             pass: "reyvaj++1984"
//         }
//     });
//     return transport;
// }

// const sendMail = async(req, res = response) => {

//     const { nombre, apellido, correo, telefono, consulta } = req.body;
//     const transporter = createTrans();
//     const info = await transporter.sendMail({
//         from: `${correo}`,
//         to: 'j_javier_m@hotmail.com',
//         subject: 'Consulta desde la appWeb',
//         html: "<h1>Hola</h1><p>mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + `${consulta}` + "</p>"
//     }).then(() => {
//         console.log('Message enviado')
//     }).catch((error) => {
//         console.log(error.response.body)
//     });

//     console.log('Message sent: %s', info.messageId);

//     return
// }
// exports.sendMail = () => sendMail;






// const { response } = require('express');
// const nodemailer = require('nodemailer');
// const nodemailerSendgrid = require('nodemailer-sendgrid');

// const createTrans = () => {
//     const transport = nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "812052db28ed5c",
//             pass: "c89f683e85f025"
//         }
//     });
//     return transport;
// }

// const sendMail = async(req, res = response) => {

//     const { nombre, apellido, correo, telefono, consulta } = req.body;
//     const transporter = createTrans();
//     const info = await transporter.sendMail({
//         from: `${correo}`,
//         to: 'j_javier_m@hotmail.com',
//         subject: 'Hello ✔',
//         html: "<h1>Hola</h1><p>mi nombre es " + nombre + " " + apellido + " mi telefono es " + telefono + " mi mensaje es " + `${consulta}` + "</p>"
//     }).then(() => {
//         console.log('Message enviado')
//     }).catch((error) => {
//         console.log(error.response.body)
//     });

//     console.log('Message sent: %s', info.messageId);

//     return
// }

// exports.sendMail = () => sendMail;