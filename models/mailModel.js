var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailSchema = {
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    consulta: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('Mail', mailSchema);