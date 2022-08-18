const { response } = require('express');
// const { validationResult } = require('express-validator');

const usuarios = require('../models/usuariosModel');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { generarJWT } = require('../helpers/jwt');
// const { dbConnection } = require('../db/config');
const jwt = require('express-jwt');


//////// CREAR USUARIO ///////////////
const crearUsuario = async(req, res = response) => {

    const { user, password } = req.body;

    try {

        //verificar si existe mail
        let usuario = await usuarios.findOne({ user });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        //crear usuario con el modelo
        const dbUser = new usuarios(req.body);

        //hashear la constraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        //generar el JWT
        const token = await generarJWT(dbUser.uid, user);
        console.log("token jwt: " + token);

        //crear usuario de DB
        const guardarUser = await dbUser.save();

        console.log(guardarUser);

        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser._id,
            user,
            role: dbUser.role,
            token
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el Administrador'
        });
    }
}

//////// LOGIN USUARIO ///////////////
const loginUsuario = async(req, res = response) => {
    const { user, password } = req.body;
    try {
        const dbUser = await usuarios.findOne({ user });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                error: 'Usuario o contraseña incorrectos'
            });
        }

        /////// COMPARAR CONTRASEÑA 
        const validPassword = await bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                error: 'Usuario o contraseña incorrectos'
            });
        }

        /////// GENERAR TOKEN 
        const token = await generarJWT(dbUser._id, user);

        /////// RESPUESTA DEL SERVICIO
        return res.json({
            ok: true,
            uid: dbUser._id,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el Administrador"
        });
    }
}

//////// BUSCAR USUARIO ///////////////
const buscarUsuario = async(req, res = response) => {
    const { id } = req.params;

    try {
        const dbUser = await usuarios.findById(id);
        res.json({
            ok: true,
            msg: 'Usuario encontrado',
            dbUser
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}


//////// VALIDAR TOKEN ///////////////
const validarToken = async(req, res = response) => {
    const { uid, user } = req;

    const token = await generarJWT(uid, user);

    return res.json({
        ok: true,
        msg: 'Operacion validar token OK',
        id: uid,
        usuario: user,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    buscarUsuario,
    validarToken
}