var express = require('express');
var router = express.Router();
var contenidoModel = require('../../models/contenidoModel');
var isLoggedIn = require('../../middleware/auth'); // Ruta al middleware

// ✅ Aplica el middleware a TODAS las rutas de este router.
// La función isLoggedIn se ejecutará para cada solicitud que llegue a este router.
router.use(isLoggedIn);

// Las rutas siguientes ya están protegidas y NO necesitan el middleware en su firma.
router.get('/', async function(req, res, next) {
    try {
        let contenido = await contenidoModel.getContenido();
        res.render('admin/contenido', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            contenido: contenido
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar la página de contenido');
    }
});

/* Eliminar contenido */
router.get('/eliminar/:id', async function (req, res, next) {
    const id = req.params.id;
    await contenidoModel.deleteContenidoById(id);
    res.redirect('/admin/contenido');
});

/* Agregar contenido */
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});

// router.post('/agregar', async (req, res, next) => {
//     try {
//         if (req.body.evento != "" && req.body.categoria != "" && req.body.descripcion != "") {
//             await contenidoModel.insertContenido(req.body);
//             res.redirect('/admin/contenido');
//         } else {
//             res.render('admin/agregar', {
//                 layout: 'admin/layout',
//                 error: true,
//                 message: 'Todos los campos son requeridos'
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.render('admin/agregar', {
//             layout: 'admin/layout',
//             error: true,
//             message: 'No se cargó el contenido'
//         });
//     }
// });

/* Modificar contenido */
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let contenido = await contenidoModel.getContenidoById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        contenido
    });
});

router.post('/modificar', async (req, res, next) => {
    try {
        let obj = {
            evento: req.body.evento,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            nombreArchivo: req.body.nombreArchivo

        };
        await contenidoModel.modificarContenidoById(obj, req.body.id);
        res.redirect('/admin/contenido');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el contenido'
        });
    }
});


module.exports = router;