var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publicidadesSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    informacion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    imagenDet: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Publicidades', publicidadesSchema);