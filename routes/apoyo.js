var express = require('express');

var app = express();

var Apoyo = require('../models/apoyo');

//=====================================================================/
//    INICIO OBTENER TODOS LOS APOYOS DEL SUTEYM
//=====================================================================/
app.get('/', (req, res, next) => {

    Apoyo.find({})
        .populate({ path: 'secretaria', select: 'nombre' })
        .exec((err, apoyos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar apoyo',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                apoyos: apoyos
            });

        });

});
//=====================================================================/
//    FIN OBTENER TODOS LOS APOYOS DEL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO CREAR APOYOS DEL SUTEYM
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var apoyo = new Apoyo({
        nombre: body.nombre,
        secretaria: body.secretaria
    });

    apoyo.save((err, apoyoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear apoyo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            apoyo: apoyoGuardado
        });

    });

});
//=====================================================================/
//    FIN CREAR APOYOS DEL SUTEYM
//=====================================================================/
module.exports = app;