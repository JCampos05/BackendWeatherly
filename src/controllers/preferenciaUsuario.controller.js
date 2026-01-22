const preferenciaUsuarioService = require('../services/preferenciaUsuario.service');

/**
 * Obtener preferencias del usuario autenticado
 */
exports.getPreferencias = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioService.getPreferencias(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Preferencias obtenidas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en getPreferencias controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener preferencias',
            error: error.message
        });
    }
};

/**
 * Actualizar preferencias del usuario
 */
exports.updatePreferencias = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioService.updatePreferencias(
            req.usuario.idUsuario,
            req.body
        );

        res.status(200).json({
            success: true,
            message: 'Preferencias actualizadas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en updatePreferencias controller:', error);
        res.status(400).json({
            success: false,
            message: 'Error al actualizar preferencias',
            error: error.message
        });
    }
};

/**
 * Restablecer preferencias a valores por defecto
 */
exports.resetPreferencias = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioService.resetPreferencias(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Preferencias restablecidas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en resetPreferencias controller:', error);
        res.status(400).json({
            success: false,
            message: 'Error al restablecer preferencias',
            error: error.message
        });
    }
};