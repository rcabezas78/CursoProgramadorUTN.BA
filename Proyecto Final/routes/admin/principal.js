// routes/admin/index.js
var express = require('express');
var router = express.Router();


// /* Diseño */
 router.get('/', async function(req, res, next) {
     try {
         //let novedades = await novedadesModel.getNovedades();
        
//         // Simulación de los 14 partidos con datos completos
         let partidos = [
             //{ torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'INDEPENDIENTE', equipoVisitante: 'RIVER', logoLocal: 'independiente.png', logoVisitante: 'River.png', fecha: '09/08', hora: '18:30' },
             { torneo: 'ESCUELA', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '10:00' },
             { torneo: 'PROMO', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '11:00' },
             { torneo: 'PREMINI', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '12:00' },
             { torneo: 'MINI', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '13:00' },
             { torneo: 'PREINFANTIL', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '14:00' },
             { torneo: 'INFANTIL', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '15:00' },
             { torneo: 'PRECADETE', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '16:00' },
             { torneo: 'CADETE', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '17:00' },
             { torneo: 'PREJUVENIL', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '18:00' },
            //  { torneo: 'JUVENIL', equipoLocal: 'MURIALDO', equipoVisitante: 'GUAYMALLEN', logoLocal: 'Murialdo.png', logoVisitante: 'Guaymallen.png', fecha: '09/08', hora: '12:00' },
            //  { torneo: 'PREJUNIOR', equipoLocal: 'MURIALDO', equipoVisitante: 'GUAYMALLEN', logoLocal: 'Murialdo.png', logoVisitante: 'Guaymallen.png', fecha: '09/08', hora: '12:00' },
             { torneo: 'JUNIOR', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '30/08', hora: '19:00' },
             { torneo: 'RESERVA', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '28/08', hora: '21:00' },
             { torneo: 'SENIOR', equipoLocal: 'B. RIVADAVIA', equipoVisitante: 'MURIALDO', logoLocal: 'Rivadavia.png', logoVisitante: 'Murialdo.png', fecha: '28/08', hora: '22:15' },
             // { torneo: 'CONMEBOL LIBERTADORES', equipoLocal: 'RIVER', equipoVisitante: 'LIBERTAD', logoLocal: 'River.png', logoVisitante: 'Libertad.png', fecha: '14/08', hora: '21:30' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'RIVER', equipoVisitante: 'GODOY CRUZ', logoLocal: 'River.png', logoVisitante: 'GodoyCruz.png', fecha: '17/08', hora: '21:30' },
             // { torneo: 'AMISTOSO', equipoLocal: 'LANUS', equipoVisitante: 'BOCA JRS', logoLocal: 'Lanus.png', logoVisitante: 'Boca.png', fecha: '24/08', hora: '15:00' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'VELEZ', equipoVisitante: 'RIVER', logoLocal: 'velez.png', logoVisitante: 'River.png', fecha: '28/08', hora: '20:00' },
             // { torneo: 'CONMEBOL LIBERTADORES', equipoLocal: 'FLUMINENSE', equipoVisitante: 'RIVER', logoLocal: 'fluminense.png', logoVisitante: 'River.png', fecha: '03/09', hora: '21:30' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'RIVER', equipoVisitante: 'BELGRANO', logoLocal: 'River.png', logoVisitante: 'belgrano.png', fecha: '07/09', hora: '17:00' },
             // { torneo: 'COPA ARGENTINA', equipoLocal: 'RIVER', equipoVisitante: 'DEFENSA', logoLocal: 'River.png', logoVisitante: 'defensa.png', fecha: '12/09', hora: '20:00' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'RACING', equipoVisitante: 'RIVER', logoLocal: 'racing.png', logoVisitante: 'River.png', fecha: '16/09', hora: '19:00' },
             // { torneo: 'CONMEBOL LIBERTADORES', equipoLocal: 'RIVER', equipoVisitante: 'PALMEIRAS', logoLocal: 'River.png', logoVisitante: 'palmeiras.png', fecha: '20/09', hora: '21:30' },
             // { torneo: 'AMISTOSO', equipoLocal: 'RIVER', equipoVisitante: 'SELECCION ARG', logoLocal: 'River.png', logoVisitante: 'seleccion.png', fecha: '25/09', hora: '18:00' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'TIGRE', equipoVisitante: 'RIVER', logoLocal: 'tigre.png', logoVisitante: 'River.png', fecha: '29/09', hora: '17:00' },
             // { torneo: 'LIGA PROFESIONAL ARGENTINA', equipoLocal: 'RIVER', equipoVisitante: 'BOCA JRS', logoLocal: 'River.png', logoVisitante: 'Boca.png', fecha: '05/10', hora: '21:30' },
             // { torneo: 'CONMEBOL LIBERTADORES', equipoLocal: 'RIVER', equipoVisitante: 'FLUMINENSE', logoLocal: 'River.png', logoVisitante: 'fluminense.png', fecha: '10/10', hora: '21:30' }
         ];

         res.render('admin/principal', {
             layout: 'admin/layout',
             //novedades: novedades,
             partidos: partidos // <-- Ahora el carrusel recibirá este array
         });
     } catch (error) {
         console.log(error);
         res.status(500).send('Error al cargar la página principal');
     }
 });

module.exports = router;