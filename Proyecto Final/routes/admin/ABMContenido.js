// ✅ En tu archivo routes/admin/ABMContenido.js

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var isLoggedIn = require('../../middleware/auth');
var contenidoModel = require('../../models/contenidoModel');


// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// Aplica el middleware de autenticación a todas las rutas
router.use(isLoggedIn);


// ✅ Ruta GET para la página principal del ABM
// ✅ Ruta GET para la página principal del ABM
router.get('/', async function (req, res, next) {
    try {
        let contenido = await contenidoModel.getContenido();

        // ✅ Obtiene el mensaje flash de éxito y lo borra de la sesión
        const successMessage = req.flash('success_msg')[0];

        // ✅ Obtiene el mensaje flash de error y lo borra de la sesión
        const errorMessage = req.flash('error_msg')[0];

        res.render('admin/ABMContenido', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            contenido: contenido,
            // ✅ Pasa el mensaje de éxito o error a la vista
            message: successMessage || errorMessage,
            error: !!errorMessage // Convierte a booleano
        });
    } catch (error) {
        console.log(error);
        res.render('admin/ABMContenido', {
            layout: 'admin/layout',
            message: 'Error al cargar la página de contenido.',
            error: true
        });
    }
});


// ✅ Ruta GET para el formulario de agregar
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});


// ✅ Ruta POST para agregar nuevo contenido y procesar el archivo
router.post('/agregar', upload.single('imagen'), async (req, res, next) => {
    try {
        if (!req.body.evento || !req.body.descripcion || !req.body.categorias) {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
            return;
        }

        const obj = {
            evento: req.body.evento,
            descripcion: req.body.descripcion,
            categorias: req.body.categorias,
            nombreArchivo: req.file ? req.file.filename : null,
            tipoContenido: req.file ? req.file.mimetype : null,
            fechaSubida: new Date()
        };

        await contenidoModel.insertContenido(obj);

        // ✅ Guarda el mensaje flash y luego redirige
        req.flash('success_msg', '¡El registro se ha guardado exitosamente!');
        res.redirect('/admin/ABMContenido'); // <-- ¡Esta línea es la clave!

    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar el contenido.'
        });
    }
});

// ✅ Rutas de eliminar
router.get('/eliminar/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        await contenidoModel.deleteContenidoById(id);

        // Usa flash y redirige a la URL limpia
        req.flash('success_msg', '¡El registro se ha eliminado exitosamente!');
        res.redirect('/admin/ABMContenido');
    } catch (error) {
        console.error(error);
        //Usa flash para el error también
        req.flash('error_msg', 'No se pudo eliminar el registro.');
        res.redirect('/admin/ABMContenido');
    }
});


// ✅ Ruta GET para la página de modificar (mostrar el formulario)
router.get('/modificar/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let contenido = await contenidoModel.getContenidoById(id);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            contenido
        });
    } catch (error) {
        console.error(error);
        res.redirect('/admin/ABMContenido?error=true&message=No se encontró el registro para modificar.');
    }
});


// ✅ Ruta POST para procesar la modificación (recibir los datos del formulario)
router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            evento: req.body.evento,
            descripcion: req.body.descripcion,
            categorias: req.body.categorias
        };
        await contenidoModel.modificarContenidoById(obj, req.body.id);
        // ✅ Redirige al listado con un parámetro de éxito
        res.redirect('/admin/ABMContenido?modified=true');
    } catch (error) {
        console.log(error);
        res.redirect('/admin/ABMContenido?error=true&message=No se pudo modificar el contenido');
    }
});

module.exports = router;
