const express = require('express');
const router = express.Router();
const zonaHorariaController = require('../controllers/zonaHoraria.controller');

// Rutas públicas - no requieren autenticación
router.get('/', zonaHorariaController.getAllZonasHorarias);
router.get('/search', zonaHorariaController.getZonaHorariaByNombre);
router.get('/offset', zonaHorariaController.getZonasHorariasByOffset);
router.get('/closest', zonaHorariaController.getZonaHorariaCercana);
router.get('/:id', zonaHorariaController.getZonaHorariaById);

module.exports = router;