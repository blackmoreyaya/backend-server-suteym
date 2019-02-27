var express = require('express');
var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var Agremiado = require('../models/agremiado');

//=====================================================================/
//    INICIO OBTENER TODOS LOS AGREMIADOS DEL SUTEYM
//=====================================================================/
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Agremiado.find({}, 'nombre profesional personal direccion contacto hijos')
        .skip(desde)
        .limit(5)
        .populate({ path: 'profesional.puesto', select: 'nombre' })
        .populate('hijos')
        .exec((err, agremiados) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar agremiado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                agremiados: agremiados
            });

        });
});
//=====================================================================/
//    FIN OBTENER TODOS LOS AGREMIADOS 
//=====================================================================/
//=====================================================================/
//    INICIO CREAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var agremiados = new Agremiado({
        nombre: body.nombre,
        profesional: body.profesional,
        personal: body.personal,
        direccion: body.direccion,
        contacto: body.contacto,
        hijos: body.hijos
    });

    agremiados.save((err, agremiadoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear agremiado',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            agremiado: agremiadoGuardado
        });

    });

});
//=====================================================================/
//    FIN CREAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO EDITAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Agremiado.findById(id, (err, agremiado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar agremiado',
                errors: err
            });
        }

        if (!agremiado) {
            return res.status(400).json({
                ok: false,
                message: 'El agremiado con el id: ' + id + ' no existe',
                errors: { message: 'No existe un agremiado con ese ID' }
            });
        }

        agremiado.nombre = body.nombre
        agremiado.profesional = body.profesional
        agremiado.personal = body.personal
        agremiado.direccion = body.direccion
        agremiado.contacto = body.contacto
        agremiado.hijos = body.hijos

        agremiado.save((err, agremiadoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al actualizar agremiado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                agremiado: agremiadoGuardado
            });

        });

    });
});
//=====================================================================/
//    FIN EDITAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO BORRAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Agremiado.findByIdAndRemove(id, (err, agremiadoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al borrar agremiado',
                errors: err
            });
        }

        if (!agremiadoBorrado) {
            return res.status(400).json({
                ok: false,
                message: 'No existe el agremiado con ese id',
                errors: { message: 'No existe un agremiado con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            agremiado: agremiadoBorrado
        });

    });

});
//=====================================================================/
//    FIN BORRAR UN AGREMIADO DEL SUTEYM
//=====================================================================/
module.exports = app;