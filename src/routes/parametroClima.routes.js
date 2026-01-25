const express = require('express');
const router = express.Router();
const parametroClimaController = require('../controllers/parametroClima.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Categorías
router.get('/categorias', parametroClimaController.getAllCategorias);

// Parámetros
router.get('/', parametroClimaController.getAllParametros);
router.get('/gratuitos', parametroClimaController.getParametrosGratuitos);
router.get('/premium', parametroClimaController.getParametrosPremium);
router.get('/categoria/:categoria', parametroClimaController.getParametrosByCategoria);
router.get('/:id', parametroClimaController.getParametroById);

module.exports = router;