var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var dependenciaSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    entidad: { type: Schema.Types.ObjectId, ref: 'Entidad', required: [true, 'Entidad necesaria'] }

});


module.exports = mongoose.model('Dependencia', dependenciaSchema);