const jwt = require('jsonwebtoken');
const { Usuario, SesionUsuario } = require('../models');

/**
 * Middleware para verificar token JWT
 */
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar que la sesión esté activa
        const sesion = await SesionUsuario.findOne({
            where: {
                idUsuario: decoded.idUsuario,
                estaActiva: true,
                tokenJWT: token
            }
        });

        if (!sesion) {
            return res.status(401).json({
                success: false,
                message: 'Sesión inválida o expirada'
            });
        }

        // Verificar que no haya expirado
        if (new Date() > sesion.fechaExpiracion) {
            await sesion.update({ estaActiva: false });
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        // Verificar que el usuario exista y esté activo
        const usuario = await Usuario.findByPk(decoded.idUsuario);
        if (!usuario || usuario.estadoCuenta !== 'activo') {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autorizado'
            });
        }

        // Agregar información del usuario al request
        req.usuario = {
            idUsuario: usuario.idUsuario,
            nombreUsuario: usuario.nombreUsuario,
            correo: usuario.correo,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        console.error('Error en verifyToken:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al verificar autenticación',
            error: error.message
        });
    }
};

/**
 * Middleware opcional - no falla si no hay token
 */
exports.optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario = await Usuario.findByPk(decoded.idUsuario);
            
            if (usuario && usuario.estadoCuenta === 'activo') {
                req.usuario = {
                    idUsuario: usuario.idUsuario,
                    nombreUsuario: usuario.nombreUsuario,
                    correo: usuario.correo
                };
            }
        }

        next();
    } catch (error) {
        next();
    }
};