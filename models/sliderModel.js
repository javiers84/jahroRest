var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sliderSchema = new Schema({
    imagen: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Slider', sliderSchema);