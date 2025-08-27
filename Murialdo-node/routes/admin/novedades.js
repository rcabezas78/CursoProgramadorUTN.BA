var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

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
        return res.render('admin/novedades', {
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
router.post('/agregar', async (req, res, next) => {
    try {
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
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad'
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
router.post('/modificar', async (req, res, next) => {
    try {
        let obj = req.body;
        
        await novedadesModel.modificarNovedadById(obj, obj.id);
        
        return res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error);
        return res.render('admin/modificar', {
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