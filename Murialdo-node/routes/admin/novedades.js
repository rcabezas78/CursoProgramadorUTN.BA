var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
<<<<<<< HEAD
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
=======
var multer = require('multer');
//var upload = require('./multer'); // Importa la configuración de multer
const upload = require('../admin/multer'); // Importa la configuración de multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
//const upload = multer({ storage: storage });


>>>>>>> 27efbc884c03031fec532318d58abab217c07085

/* Diseño de la vista de novedades */
router.get('/', async function (req, res, next) {
    try {
        var novedades = await novedadesModel.getNovedades();
        // ✅ Aseguramos que solo haya una respuesta para evitar el error 'headersSent'
        return res.render('admin/novedades', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedades
        });
    } catch (error) {
        console.log(error);
<<<<<<< HEAD
        return res.render('admin/novedades', {
=======
        res.render('admin/novedades', {
>>>>>>> 27efbc884c03031fec532318d58abab217c07085
            layout: 'admin/layout',
            usuario: req.session.nombre,
            error: true,
            message: 'No se pudieron cargar las novedades.'
        });
    }
});

/* Ruta GET para el formulario de agregar */
router.get('/agregar', (req, res, next) => {
    return res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

/* Envía los datos de la novedad */
router.post('/agregar', upload.single('imagen'), async (req, res, next) => {
    try {
<<<<<<< HEAD
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo !== "" && req.body.subtitulo !== "" && req.body.cuerpo !== "") {
            await novedadesModel.insertNovedad({ ...req.body, img_id });
            return res.redirect('/admin/novedades');
        } else {
            return res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        return res.render('admin/agregar', {
=======
        const imgId = req.file.filename;

        // Añade esta línea para ver lo que se está recibiendo
        console.log('Datos recibidos del formulario:', req.body);

        await novedadesModel.insertNovedad({
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id: imgId
        });
        
        res.redirect('/admin/novedades'); 
    } catch (error) {
        console.error('Error al guardar la novedad:', error);
        res.render('admin/agregar', {
>>>>>>> 27efbc884c03031fec532318d58abab217c07085
            layout: 'admin/layout',
            message: 'No se pudo guardar la novedad. Asegúrate de que todos los campos estén llenos.'
        });
    }
});

/* Ruta GET para el formulario de modificar y cargar los datos */
router.get('/modificar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var novedad = await novedadesModel.getNovedadById(id);
        
        return res.render('admin/modificar', {
            layout: 'admin/layout',
            novedad
        });
    } catch (error) {
        console.log(error);
        return res.render('admin/novedades', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar la novedad a modificar.'
        });
    }
});

/* Ruta POST para modificar la novedad */
/* Ruta POST para modificar la novedad */
router.post('/modificar', upload.single('imagen'), async (req, res, next) => {
    try {
        let obj = req.body;
        
<<<<<<< HEAD
        await novedadesModel.modificarNovedadById(obj, obj.id);
        
        return res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error);
        return res.render('admin/modificar', {
=======
        // Verifica si se subió una nueva imagen.
        if (req.file) {
            obj.img_id = req.file.filename;
        } else {
            // Si no se subió una nueva imagen, conserva la original.
            obj.img_id = req.body.img_original;
        }

        // Obtiene el ID de la novedad desde el campo oculto del formulario.
        const id = obj.id;
        delete obj.id; // Elimina el ID del objeto para que no se intente actualizar en la BD.

        console.log('Objeto de datos a actualizar:', obj);
        console.log('ID a actualizar:', id);

        await novedadesModel.modificarNovedadById(obj, id);
        
        res.redirect('/admin/novedades');

    } catch (error) {
        console.error('Error al modificar la novedad:', error);
        res.render('admin/modificar', {
>>>>>>> 27efbc884c03031fec532318d58abab217c07085
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la novedad'
        });
    }
});

/* Eliminar novedad */
router.get('/eliminar/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        await novedadesModel.deleteNovedadesById(id);
        return res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        return res.redirect('/admin/novedades');
    }
});

module.exports = router;