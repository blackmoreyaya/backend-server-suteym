var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var entidadSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
}, { collection: 'entidades' });

module.exports = mongoose.model('Entidad', entidadSchema);