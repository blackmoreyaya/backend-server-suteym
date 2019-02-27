var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var agremiadoSchema = new Schema({

    nombre: { type: String, require: [true, 'El nombre es necesario'] },
    profesional: {
        fechaServicio: { type: String, require: [true, 'La fecha de ingreso al servicio público es necesario'] },
        claveServidor: { type: String, require: [true, 'La clave de servidor público es necesaria'] },
        claveIssemym: { type: String, require: [true, 'La clave de ISSEMYM es necesaria'] },
        fechaSuteym: { type: Date, require: [true, 'La fecha de ingreso al SUTEYM es necesario'] },
        adscripción: { type: String, require: false },
        departamento: { type: String, require: [true, 'El departamento es necesario'] },
        puesto: { type: Schema.Types.ObjectId, ref: 'Puesto', required: [true, 'El puesto es necesario'] },
    },
    personal: {
        rfc: { type: String, require: [true, 'El RFC es necesario'] },
        curp: { type: String, require: [true, 'El CURP es necesario'] },
        sexo: { type: String, require: [true, 'El sexo es necesario'] },
        estadoCivil: { type: String, require: [true, 'El estado civil es necesario'] },
        estudios: { type: String, require: [true, 'El grado de estudios es necesario'] },
    },
    direccion: {
        calle: { type: String, require: [true, 'La calle es necesaria'] },
        numeroExt: { type: String, require: false },
        numeroInterior: { type: String, require: false },
        referencia: { type: String, require: false },
        colonia: { type: String, require: [true, 'La colonia es necesaria'] },
        localidad: { type: String, require: [true, 'La localidad es necesaria'] },
        municipio: { type: String, require: [true, 'el municipio es necesario'] },
        entidad: { type: String, require: [true, 'La entidad es necesaria'] },
        cp: { type: String, require: [true, 'El código postal es necesario'] },
        seccionElectoral: { type: String, require: false }
    },
    contacto: {
        telCasa: { type: String, require: false },
        telMovil: { type: String, require: false },
        telOficina: { type: String, require: false },
        email: { type: String, require: [true, 'El correo electrónico es necesario'] },
        redSocial: {
            facebook: { type: String, require: false },
            twitter: { type: String, require: false },
            instagram: { type: String, require: false },
        }
    },
    img: { type: String, required: false },
    apoyo: [{
        nombre: { type: Schema.Types.ObjectId, ref: 'Apoyo', required: false },
        fecha: { type: Date, require: false }
    }],
    hijos: [{
        nombre: { type: String, require: false },
        sexo: { type: String, require: false },
        edad: { type: Number, require: false },
        apoyo: [{
            nombre: { type: Schema.Types.ObjectId, ref: 'Apoyo', required: false },
            fecha: { type: Date, require: false }
        }]
    }],

});

module.exports = mongoose.model('Agremiado', agremiadoSchema);