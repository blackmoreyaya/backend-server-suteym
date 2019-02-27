var express = require('express');

var app = express();

var Agremiado = require('../models/agremiado');
var Puesto = require('../models/puesto');

//=====================================================================/
//    INICIO BUSQUEDA EN COLECCIÒN ESPECIFICA
//=====================================================================/
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'agremiados':
            promesa = buscarAgremiado(busqueda, regex);
            break;

        case 'puestos':
            promesa = buscarPuesto(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                message: 'Los tipos de busqueda solo son: agremiados',
                error: { message: 'Tipo de colección no valida' }
            });
    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });
    });
});
//=====================================================================/
//    FIN BUSQUEDA EN COLECCIÒN ESPECIFICA
//=====================================================================/
//=====================================================================/
//    INICIO FUNCIONES DE BUSQUEDA
//=====================================================================/
function buscarAgremiado(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Agremiado.find({}, 'nombre contacto.email')
            .or([{ 'nombre': regex }, { 'contacto.email': regex }])
            .exec((err, agremiados) => {
                if (err) {
                    reject('Error al cargar agremiados', err);
                } else {
                    resolve(agremiados);
                }
            });

    });

}

function buscarPuesto(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Puesto.find({}, 'nombre')
            .exec((err, puestos) => {
                if (err) {
                    reject('Error al cargar puestos', err);
                } else {
                    resolve(puestos);
                }
            });

    });

}
//=====================================================================/
//    FIN FUNCIONES DE BUSQUEDA
//=====================================================================/
module.exports = app;