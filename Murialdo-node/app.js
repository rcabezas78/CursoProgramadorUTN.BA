var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');
<<<<<<< HEAD
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/admin/index');
var usersRouter = require('./routes/users');

// Manejador de rutas
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');
// Fin Manejador de rutas
=======

var indexRouter = require('./routes/admin/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');
>>>>>>> 27efbc884c03031fec532318d58abab217c07085

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
<<<<<<< HEAD
    secret: '12w45qe1qe4q1eq54eq5',
    resave: false,
    saveUninitialized: true
}));

// ✅ Middleware para manejo de subida de archivos
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Middleware de seguridad (secured)
secured = async (req, res, next) => {
    try {
        if (req.session.id_usuario) {
            next();
        } else {
            // ✅ Agrega 'return' para detener la ejecución
            return res.redirect('/admin/login');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/admin/login');
    }
}

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// Rutas que agrego
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
app.use('/admin/index', secured, indexRouter); // ✅ Agregamos 'secured' a la ruta de índice

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
=======
  secret: '12w45qe1qe4q1eq54eq5',
  resave: false,
  saveUninitialized: true
}));

// Middleware de seguridad para proteger las rutas del panel de control
var secured = async (req, res, next) => {
  try {
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};

// Rutas públicas
app.use('/admin/login', loginRouter);
app.use('/users', usersRouter); 

// Rutas protegidas por el middleware de seguridad
app.use('/admin/novedades', secured, adminRouter);
app.use('/admin/index', secured, indexRouter);

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
>>>>>>> 27efbc884c03031fec532318d58abab217c07085
});

module.exports = app;