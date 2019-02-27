var express = require('express');

var app = express();

var Dependencia = require('../models/dependencia');


//=====================================================================/
//    INICIO OBTENER TODAS LAS DEPENDENCIAS DEL SUTEYM
//=====================================================================/
app.get('/', (req, res, next) => {

    Dependencia.find({})
        .populate('entidad')
        .exec((err, dependencias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar dependencias',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                dependencias: dependencias
            });

        });
});
//=====================================================================/
//    FIN OBTENER TODAS LAS DEPENDENCIAS DEL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO CREAR DEPENDENCIA DEL SUTEYM
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var dependencia = new Dependencia({
        nombre: body.nombre,
        img: body.img,
        entidad: body.entidad
    });

    dependencia.save((err, dependenciaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear dependencia',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            dependencia: dependenciaGuardada
        });

    });

});
//=====================================================================/
//    FIN CREAR DEPENDENCIA DEL SUTEYM
//=====================================================================/
module.exports = app;