var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catalogoSchema = new Schema({
    catalogoPdf: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Catalogo', catalogoSchema);