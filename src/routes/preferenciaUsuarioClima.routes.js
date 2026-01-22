const express = require('express');
const router = express.Router();
const preferenciaUsuarioClimaController = require('../controllers/preferenciaUsuarioClima.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

router.get('/', preferenciaUsuarioClimaController.getPreferenciasClima);
router.get('/activas', preferenciaUsuarioClimaController.getPreferenciasActivas);
router.post('/', preferenciaUsuarioClimaController.createOrUpdatePreferencia);
router.put('/multiple', preferenciaUsuarioClimaController.updateMultiplePreferencias);
router.put('/reordenar', preferenciaUsuarioClimaController.reordenarParametros);
router.put('/toggle/:idParametroClima', preferenciaUsuarioClimaController.toggleParametro);
router.delete('/:idParametroClima', preferenciaUsuarioClimaController.deletePreferencia);
router.post('/reset', preferenciaUsuarioClimaController.resetPreferenciasClima);

module.exports = router;