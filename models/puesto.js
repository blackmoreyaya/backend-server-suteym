var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var puestoSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    salario_min: { type: Number, required: false },
    salario_max: { type: Number, required: false }

});


module.exports = mongoose.model('Puesto', puestoSchema);