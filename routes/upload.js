var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Agremiado = require('../models/agremiado');
var Usuario = require('../models/usuario');

// niddleware default options
app.use(fileUpload());

//=====================================================================/
//    INICIO SUBIR IMAGEN AL SERVIDOR
//=====================================================================/
app.put('/:tipo/:id', (request, response, next) => {

    var tipo = request.params.tipo;
    var id = request.params.id;


    // Tipos de colecciones
    var tiposValidos = ['agremiados', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {

        return response.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { message: 'Las colecciones validas son: ' + tiposValidos.join(', ') }
        });

    }

    if (!request.files) {

        return response.status(400).json({
            ok: false,
            mensaje: 'No ha seleccionado nada',
            errors: { message: 'No has seleccionado una imagen' }
        });

    }

    // Obtener nombre del archivo
    var archivo = request.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo estas extensiones se aceptan
    var extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {

        return response.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            errors: { message: 'Las extensiones validas son: ' + extensionesValidas.join(', ') }
        });

    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path especifico
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, response)

        // response.status(200).json({
        //     ok: true,
        //     mensaje: 'Peticion realizada correctamente',
        //     nombreCortado: extensionArchivo
        // });
    });

});
//=====================================================================/
//    FIN SUBIR IMAGEN AL SERVIDOR
//=====================================================================/
function subirPorTipo(tipo, id, nombreArchivo, response) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return response.status(400).json({
                    ok: true,
                    mensaje: 'El usuario no existe',
                    error: { message: 'El usuario no existe' }
                });
            }

            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            });

        });

    }

    if (tipo === 'agremiados') {

        Agremiado.findById(id, (err, agremiado) => {

            if (!agremiado) {
                return response.status(400).json({
                    ok: true,
                    mensaje: 'El agremiado no existe',
                    error: { message: 'El agremiado no existe' }
                });
            }

            var pathViejo = './uploads/medicos/' + agremiado.img;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            agremiado.img = nombreArchivo;

            agremiado.save((err, agremiadoAtualizado) => {
                return response.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de agremiado actualizada',
                    agremiado: agremiadoAtualizado
                });
            });

        });

    }

}


module.exports = app;