var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    imagen: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Productos', productoSchema);