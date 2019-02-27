var express = require('express');

var app = express();

var Secretaria = require('../models/secretaria');

//=====================================================================/
//    INICIO OBTENER TODAS LAS SECRETARÍAS QUE BRINDA APOYO EN EL SUTEYM
//=====================================================================/
app.get('/', (req, res, next) => {

    Secretaria.find({})
        .populate('entidad')
        .exec((err, secretarias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar secretaría',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                secretarias: secretarias
            });

        });

});
//=====================================================================/
//    FIN OBTENER TODAS LAS SECRETARÍAS QUE BRINDA APOYO EN EL SUTEYM
//=====================================================================/
//=====================================================================/
//    INICIO CREAR SECRETARIA QUE BRINDA APOYO EN EL SUTEYM
//=====================================================================/
app.post('/', (req, res) => {

    var body = req.body;

    var secretaria = new Secretaria({
        nombre: body.nombre,
        entidad: body.entidad
    });

    secretaria.save((err, secretariaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear secretaría',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            secretaria: secretariaGuardada
        });

    });

});
//=====================================================================/
//    FIN CREAR SECRETARIA QUE BRINDA APOYO EN EL SUTEYM
//=====================================================================/
module.exports = app;