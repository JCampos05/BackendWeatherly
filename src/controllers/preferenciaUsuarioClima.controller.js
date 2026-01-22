const preferenciaUsuarioClimaService = require('../services/preferenciaUsuarioClima.service');

/**
 * Obtener todas las preferencias climáticas del usuario
 */
exports.getPreferenciasClima = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioClimaService.getPreferenciasClima(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Preferencias climáticas obtenidas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en getPreferenciasClima controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener preferencias climáticas',
            error: error.message
        });
    }
};

/**
 * Obtener preferencias climáticas activas
 */
exports.getPreferenciasActivas = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioClimaService.getPreferenciasActivas(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Preferencias activas obtenidas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en getPreferenciasActivas controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener preferencias activas',
            error: error.message
        });
    }
};

/**
 * Crear o actualizar una preferencia climática
 */
exports.createOrUpdatePreferencia = async (req, res) => {
    try {
        const { idParametroClima, estaActivo, ordenVisualizacion, configuracionAdicional } = req.body;

        if (!idParametroClima) {
            return res.status(400).json({
                success: false,
                message: 'idParametroClima es requerido'
            });
        }

        const preferencia = await preferenciaUsuarioClimaService.createOrUpdatePreferencia(
            req.usuario.idUsuario,
            idParametroClima,
            { estaActivo, ordenVisualizacion, configuracionAdicional }
        );

        res.status(200).json({
            success: true,
            message: 'Preferencia actualizada',
            data: preferencia
        });

    } catch (error) {
        console.error('Error en createOrUpdatePreferencia controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Actualizar múltiples preferencias climáticas
 */
exports.updateMultiplePreferencias = async (req, res) => {
    try {
        const { preferencias } = req.body;

        if (!preferencias || !Array.isArray(preferencias)) {
            return res.status(400).json({
                success: false,
                message: 'preferencias debe ser un array'
            });
        }

        const resultado = await preferenciaUsuarioClimaService.updateMultiplePreferencias(
            req.usuario.idUsuario,
            preferencias
        );

        res.status(200).json({
            success: true,
            message: 'Preferencias actualizadas',
            data: resultado
        });

    } catch (error) {
        console.error('Error en updateMultiplePreferencias controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Eliminar preferencia climática
 */
exports.deletePreferencia = async (req, res) => {
    try {
        const { idParametroClima } = req.params;

        const resultado = await preferenciaUsuarioClimaService.deletePreferencia(
            req.usuario.idUsuario,
            idParametroClima
        );

        res.status(200).json({
            success: true,
            message: resultado.message
        });

    } catch (error) {
        console.error('Error en deletePreferencia controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Restablecer preferencias climáticas
 */
exports.resetPreferenciasClima = async (req, res) => {
    try {
        const preferencias = await preferenciaUsuarioClimaService.resetPreferenciasClima(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Preferencias climáticas restablecidas',
            data: preferencias
        });

    } catch (error) {
        console.error('Error en resetPreferenciasClima controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al restablecer preferencias',
            error: error.message
        });
    }
};

/**
 * Activar/Desactivar parámetro
 */
exports.toggleParametro = async (req, res) => {
    try {
        const { idParametroClima } = req.params;
        const { estaActivo } = req.body;

        if (estaActivo === undefined) {
            return res.status(400).json({
                success: false,
                message: 'estaActivo es requerido'
            });
        }

        const preferencia = await preferenciaUsuarioClimaService.toggleParametro(
            req.usuario.idUsuario,
            idParametroClima,
            estaActivo
        );

        res.status(200).json({
            success: true,
            message: `Parámetro ${estaActivo ? 'activado' : 'desactivado'}`,
            data: preferencia
        });

    } catch (error) {
        console.error('Error en toggleParametro controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Reordenar parámetros
 */
exports.reordenarParametros = async (req, res) => {
    try {
        const { parametros } = req.body;

        if (!parametros || !Array.isArray(parametros)) {
            return res.status(400).json({
                success: false,
                message: 'parametros debe ser un array con idParametroClima y ordenVisualizacion'
            });
        }

        const resultado = await preferenciaUsuarioClimaService.reordenarParametros(
            req.usuario.idUsuario,
            parametros
        );

        res.status(200).json({
            success: true,
            message: 'Parámetros reordenados',
            data: resultado
        });

    } catch (error) {
        console.error('Error en reordenarParametros controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};