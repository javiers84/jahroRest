const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { sendMail } = require('./config/mail');

require('dotenv').config();

const config = require('./config');
const { dbConnection } = require("./db/config");

const app = express();
const router = express.Router();

dbConnection();

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '100mb' }));
app.use(express.static('public'));

// app.use(process.env.path, express.static(__dirname + "public/upload/"));
app.use(express.static(__dirname + '/public/upload'));

// app.use('/api', require('./routes/auth'));

app.use('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization');
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en puerto ${process.env.PORT}`);
});

///// ROUTES USUARIOS
app.use('/api/auth', require('./routes/usuariosRoutes'));

///// ROUTES CATALOGO
app.use('/api/catalogo', require('./routes/catalogoRoutes'));

///// ROUTES NOVEDADES
app.use('/api/novedades', require('./routes/novedadesRoutes'));

///// ROUTES PUBLICIDADES
app.use('/api/publicidades', require('./routes/publicidadesRoutes'));

///// ROUTES SLIDER
app.use('/api/slider', require('./routes/sliderRoutes'));

///// ROUTES PRODUCTOS
app.use('/api/productos', require('./routes/productosRoutes'));

///// ENVIO DE CORREO
app.use('/api/mail', require('./routes/mail'));

// sendMail();

///// MANEJADOR DE RUTAS
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/upload/', 'index.html'));
// });

app.use(router);