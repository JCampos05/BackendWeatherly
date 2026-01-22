const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const ubicacionRoutes = require('./ubicacion.routes');
const zonaHorariaRoutes = require('./zonaHoraria.routes');
const paisRoutes = require('./pais.routes');
const preferenciaUsuarioRoutes = require('./preferenciaUsuario.routes');
const parametroClimaRoutes = require('./parametroClima.routes');
const preferenciaUsuarioClimaRoutes = require('./preferenciaUsuarioClima.routes');

// Definir rutas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/ubicaciones', ubicacionRoutes);
router.use('/zonas-horarias', zonaHorariaRoutes);
router.use('/paises', paisRoutes);
router.use('/preferencias-usuario', preferenciaUsuarioRoutes);
router.use('/parametros-clima', parametroClimaRoutes);
router.use('/preferencias-clima', preferenciaUsuarioClimaRoutes);

module.exports = router;