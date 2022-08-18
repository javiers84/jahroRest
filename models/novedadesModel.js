var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var novedadesSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    informacion1: {
        type: String,
        required: true
    },
    informacion2: {
        type: String,
        required: true
    },
    descripcion1: {
        type: String,
        required: true
    },
    descripcion2: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    imagenDet1: {
        type: String,
        required: true
    },
    imagenDet2: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Novedades', novedadesSchema);