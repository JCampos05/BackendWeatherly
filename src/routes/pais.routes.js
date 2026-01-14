const express = require('express');
const router = express.Router();
const paisController = require('../controllers/pais.controller');

// Rutas públicas - no requieren autenticación
router.get('/', paisController.getAllPaises);
router.get('/comunes', paisController.getPaisesComunes);
router.get('/search', paisController.searchPaisesByNombre);
router.get('/region/:region', paisController.getPaisesByRegion);
router.get('/codigo/:codigo', paisController.getPaisByCodigo);
router.get('/:id', paisController.getPaisById);

module.exports = router;