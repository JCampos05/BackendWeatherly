const express = require('express');
const router = express.Router();
const ubicacionGuardadaController = require('../controllers/ubicacionGuardada.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Obtener todas las ubicaciones guardadas del usuario
router.get('/', ubicacionGuardadaController.getAllByUser);

// Crear nueva ubicación guardada
router.post('/', ubicacionGuardadaController.create);

// Reordenar ubicaciones
router.post('/reorder', ubicacionGuardadaController.reorder);

// Obtener ubicación guardada específica
router.get('/:id', ubicacionGuardadaController.getById);

// Actualizar ubicación guardada
router.put('/:id', ubicacionGuardadaController.update);

// Eliminar ubicación guardada
router.delete('/:id', ubicacionGuardadaController.delete);

module.exports = router;