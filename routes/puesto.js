var express = require('express');

var app = express();

var Puesto = require('../models/puesto');

//=====================================================================/
//    INICIO OBTENER TODOS LOS PUESTOS DE GOBIERNO
//=====================================================================/
app.get('/', (req, res, next) => {

    Puesto.find({})
        .exec((err, puestos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar puestos',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                puesto: puestos
            });

        });

});
//=====================================================================/
//    FIN OBTENER TODOS LOS PUESTOS DE GOBIERNO
//=====================================================================/
//=====================================================================/
//    INICIO CREAR PUESTO DE GOBIERNO
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var puesto = new Puesto({
        nombre: body.nombre,
        salario_min: body.salario_min,
        salario_max: body.salario_max
    });

    puesto.save((err, puestoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear puesto',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            puesto: puestoGuardado
        });

    });

});
//=====================================================================/
//    FIN CREAR PUESTO DE GOBIERNO
//=====================================================================/
module.exports = app;