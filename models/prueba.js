var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hijoAgSchema = new Schema({

    datos: [{
        nombre: { type: String, require: false },
        edad: { type: Number, require: false }
    }]

});

var agremiadoSchema = new Schema({

    nombre: { type: String, require: [true, 'El nombre es necesario'] },
    hijos: { type: Schema.Types.ObjectId, ref: 'Hijoag', required: false }

});

var hijo = mongoose.model('Hijoag', hijoAgSchema);
var agremiado = mongoose.model('Agremiado', agremiadoSchema);

module.exports = {
    Hijo: hijo,
    Agremiado: agremiado
};

// console.log(body.hijos);
// if (body.hijos === undefined) {
//     console.log("primer body", body.hijos);
//     body.hijos = [{
//         datos: null
//     }];


// }

// console.log("Este es despues del if", body.hijos.datos);
// console.log(body);


//=====================================================================/
//    CREO QUE TENDRIA QUE CREAR DOBLES PETICIONES UNA PARA CON UNA COSA Y OTRA CON OTRA
// POR AHORA NO SE ME OCURRE NADA MEJOR
// PERO PARECE QUE VAMOS POR UN BUEN CAMINO
//=====================================================================/

// var hijos = new Modulos.Hijo({
//     datos: body.hijos.datos
// });

// hijos.save((err, hijosGuardados) => {

//     if (err) {
//         return res.status(400).json({
//             ok: false,
//             message: 'Error al crear hijos',
//             errors: err
//         });
//     }

//     res.status(201).json({
//         ok: true,
//         hijos: hijosGuardados
//     });

// });

// console.log(hijos._id);