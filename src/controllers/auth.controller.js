const authService = require('../services/auth.service');

/**
 * Registrar nuevo usuario
 */
exports.register = async (req, res) => {
    try {
        const { nombreUsuario, nombre, apellidos, correo, password } = req.body;

        // Validaciones
        if (!nombreUsuario || !nombre || !correo || !password) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const usuario = await authService.register({
            nombreUsuario,
            nombre,
            apellidos,
            correo,
            password
        });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: usuario
        });

    } catch (error) {
        console.error('Error en register controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Login de usuario
 */
exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                success: false,
                message: 'Correo y contraseña son requeridos'
            });
        }

        // Información del dispositivo
        const deviceInfo = {
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'] || 'Unknown',
            deviceName: req.body.deviceName || 'Web Browser'
        };

        const result = await authService.login(
            { correo, password },
            deviceInfo
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: result
        });

    } catch (error) {
        console.error('Error en login controller:', error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Logout de usuario
 */
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        await authService.logout(token);

        res.status(200).json({
            success: true,
            message: 'Sesión cerrada correctamente'
        });

    } catch (error) {
        console.error('Error en logout controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al cerrar sesión',
            error: error.message
        });
    }
};

/**
 * Refrescar token
 */
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token no proporcionado'
            });
        }

        const result = await authService.refreshToken(refreshToken);

        res.status(200).json({
            success: true,
            message: 'Token refrescado',
            data: result
        });

    } catch (error) {
        console.error('Error en refreshToken controller:', error);
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Solicitar recuperación de contraseña
 */
exports.requestPasswordReset = async (req, res) => {
    try {
        const { correo } = req.body;

        if (!correo) {
            return res.status(400).json({
                success: false,
                message: 'Correo es requerido'
            });
        }

        const result = await authService.requestPasswordReset(correo);

        res.status(200).json({
            success: true,
            message: 'Token de recuperación enviado',
            data: result
        });

    } catch (error) {
        console.error('Error en requestPasswordReset controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Restablecer contraseña
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token, nuevaPassword } = req.body;

        if (!token || !nuevaPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token y nueva contraseña son requeridos'
            });
        }

        if (nuevaPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        await authService.resetPassword(token, nuevaPassword);

        res.status(200).json({
            success: true,
            message: 'Contraseña restablecida correctamente'
        });

    } catch (error) {
        console.error('Error en resetPassword controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener perfil del usuario autenticado
 */
exports.getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Perfil obtenido',
            data: req.usuario
        });
    } catch (error) {
        console.error('Error en getProfile controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
            error: error.message
        });
    }
};