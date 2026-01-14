const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const ubicacionRoutes = require('./ubicacion.routes');
const zonaHorariaRoutes = require('./zonaHoraria.routes');
const paisRoutes = require('./pais.routes');

// Definir rutas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/ubicaciones', ubicacionRoutes);
router.use('/zonas-horarias', zonaHorariaRoutes);
router.use('/paises', paisRoutes);

module.exports = router;