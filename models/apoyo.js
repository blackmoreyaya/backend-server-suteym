var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var apoyoSchema = new Schema({

    nombre: { type: String, require: [true, 'El nombre del apoyo es necesario'] },
    secretaria: { type: Schema.Types.ObjectId, ref: 'Secretaria', required: [true, 'La secretaría que da el apoyo es necesaria'] },

});

module.exports = mongoose.model('Apoyo', apoyoSchema);