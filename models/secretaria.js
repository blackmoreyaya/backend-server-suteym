var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var secretariaSchema = new Schema({

    nombre: { type: String, require: [true, 'El nombre de la secretaría es necesario'] },
    entidad: { type: Schema.Types.ObjectId, ref: 'Entidad', required: [true, 'La entidad a la que la secretaría da apoyo es necesaria'] },

});

module.exports = mongoose.model('Secretaria', secretariaSchema);