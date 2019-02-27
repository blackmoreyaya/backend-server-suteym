// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Rutas Importadas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var entidadRoutes = require('./routes/entidad');
var dependenciaRoutes = require('./routes/dependencia');
var puestoRoutes = require('./routes/puesto');
var agremiadoRoutes = require('./routes/agremiado');
var busquedaRoutes = require('./routes/busqueda');
var secretariaRoutes = require('./routes/secretaria');
var apoyoRoutes = require('./routes/apoyo');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/suteymDB', { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos en puerto 27017: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas 
app.use('/busqueda', busquedaRoutes);
app.use('/entidad', entidadRoutes);
app.use('/dependencia', dependenciaRoutes);
app.use('/puesto', puestoRoutes);
app.use('/secretaria', secretariaRoutes);
app.use('/apoyo', apoyoRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/agremiado', agremiadoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});