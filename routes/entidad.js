var express = require('express');

var app = express();

var Entidad = require('../models/entidad');

//=====================================================================/
//    INICIO OBTENER TODAS LAS ENTIDADES DEL SUTEYM
//=====================================================================/
app.get('/', (req, res, next) => {

    Entidad.find({})
        .exec((err, entidades) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar entidades',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                entidades: entidades
            });

        });

});
//=====================================================================/
//    FIN OBTENER TODAS LAS ENTIDADES DEL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO CREAR ENTIDAD DEL SUTEYM
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var entidad = new Entidad({
        nombre: body.nombre
    });

    entidad.save((err, entidadGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear entidad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            entidad: entidadGuardada
        });

    });

});
//=====================================================================/
//    FIN CREAR ENTIDAD DEL SUTEYM
//=====================================================================/
module.exports = app;