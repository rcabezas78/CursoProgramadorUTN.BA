// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Asegúrate de tenerlo instalado
const flash = require('connect-flash');
var hbs = require('hbs');

require('dotenv').config();

// --- Importar tus archivos de ruta ---
var indexRouter = require('./routes/admin/principal'); // El index principal ahora es el del admin
var adminLoginRouter = require('./routes/admin/login'); // Para /admin/login
//var indexRouter = require('./routes/admin/index'); // El index principal ahora es el del admin
//var adminLoginRouter = require('./routes/admin/login'); // Para /admin/login
var adminContenidoRouter = require('./routes/admin/contenido'); // Para /admin/contenido
var adminPrincipalRouter=require('./routes/admin/principal');
var adminCategoriasRouter=require('./routes/admin/categorias');
var adminContactoRouter=require('./routes/admin/contacto');
var adminGaleriaRouter=require('./routes/admin/galeria');
var adminABMContenidoRouter=require('./routes/admin/ABMContenido');
//const router = require('./routes/admin/galeria');
var app = express();

//const express = require('express');
//const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));


// Helper para agrupar elementos en Handlebars
hbs.registerHelper('eachPartidosByGroup', function(arr, groupSize, options) {
    if (!arr || arr.length === 0) {
        return options.inverse(this);
    }
    var result = '';
    for (var i = 0; i < arr.length; i += groupSize) {
        var group = arr.slice(i, i + groupSize);
        result += options.fn(group, {
            data: {
                first: (i === 0)
            }
        });
    }
    return result;
});

// Configuración de la sesión
app.use(session({
  secret: '12w45qe1qe4q1eq54eq5',
  resave: false,
  saveUninitialized: true
}));


app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// --- Definición y Montaje de Rutas ---
// La ruta raíz '/' será manejada por el router de administración
app.use('/', indexRouter); 
// Las demás rutas de administración se montan con su prefijo
app.use('/admin/login', adminLoginRouter);
app.use('/admin/principal', adminPrincipalRouter);
app.use('/admin/contenido', adminContenidoRouter);
app.use('/admin/categorias', adminCategoriasRouter);
app.use('/admin/contacto', adminContactoRouter);
app.use('/admin/galeria', adminGaleriaRouter);
app.use('/admin/ABMContenido', adminABMContenidoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Ejemplo de configuración de Handlebars con Express
//const hbs = require('hbs');
//sconst path = require('path');

// Registrar el helper
hbs.registerHelper('formatDate', (date) => {
  if (date) {
    const d = new Date(date);
    // Obtener día, mes y año y formatearlos
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return '';
});

// Configurar el motor de vistas de Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


module.exports = app;
