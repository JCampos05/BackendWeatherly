const express = require('express');
const router = express.Router();
const preferenciaUsuarioController = require('../controllers/preferenciaUsuario.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

router.get('/', preferenciaUsuarioController.getPreferencias);
router.put('/', preferenciaUsuarioController.updatePreferencias);
router.post('/reset', preferenciaUsuarioController.resetPreferencias);

module.exports = router;