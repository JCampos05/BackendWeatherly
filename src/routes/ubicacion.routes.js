const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacion.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Ubicación principal
router.get('/principal', ubicacionController.getUbicacionPrincipal);
router.post('/principal', ubicacionController.setUbicacionPrincipal);
router.put('/principal', ubicacionController.setUbicacionPrincipal);
router.delete('/principal', ubicacionController.deleteUbicacionPrincipal);

// Ubicaciones guardadas
router.get('/guardadas', ubicacionController.getUbicacionesGuardadas);
router.post('/guardadas', ubicacionController.createUbicacionGuardada);
router.get('/guardadas/:id', ubicacionController.getUbicacionGuardada);
router.put('/guardadas/:id', ubicacionController.updateUbicacionGuardada);
router.delete('/guardadas/:id', ubicacionController.deleteUbicacionGuardada);
router.post('/guardadas/reorder', ubicacionController.reorderUbicaciones);

module.exports = router;