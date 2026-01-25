const parametroClimaService = require('../services/parametroClima.service');

/**
 * Obtener todos los parámetros climáticos
 */
exports.getAllParametros = async (req, res) => {
    try {
        const parametros = await parametroClimaService.getAllParametros();

        res.status(200).json({
            success: true,
            message: 'Parámetros obtenidos',
            data: parametros
        });

    } catch (error) {
        console.error('Error en getAllParametros controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener parámetros',
            error: error.message
        });
    }
};

/**
 * Obtener parámetros por categoría
 */
exports.getParametrosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        const parametros = await parametroClimaService.getParametrosByCategoria(categoria);

        res.status(200).json({
            success: true,
            message: 'Parámetros obtenidos',
            data: parametros
        });

    } catch (error) {
        console.error('Error en getParametrosByCategoria controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener parámetros',
            error: error.message
        });
    }
};

/**
 * Obtener parámetro por ID
 */
exports.getParametroById = async (req, res) => {
    try {
        const { id } = req.params;

        const parametro = await parametroClimaService.getParametroById(id);

        res.status(200).json({
            success: true,
            message: 'Parámetro obtenido',
            data: parametro
        });

    } catch (error) {
        console.error('Error en getParametroById controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener parámetros gratuitos
 */
exports.getParametrosGratuitos = async (req, res) => {
    try {
        const parametros = await parametroClimaService.getParametrosGratuitos();

        res.status(200).json({
            success: true,
            message: 'Parámetros gratuitos obtenidos',
            data: parametros
        });

    } catch (error) {
        console.error('Error en getParametrosGratuitos controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener parámetros',
            error: error.message
        });
    }
};

/**
 * Obtener parámetros premium
 */
exports.getParametrosPremium = async (req, res) => {
    try {
        const parametros = await parametroClimaService.getParametrosPremium();

        res.status(200).json({
            success: true,
            message: 'Parámetros premium obtenidos',
            data: parametros
        });

    } catch (error) {
        console.error('Error en getParametrosPremium controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener parámetros',
            error: error.message
        });
    }
};

/**
 * NUEVO: Obtener todas las categorías
 */
exports.getAllCategorias = async (req, res) => {
    try {
        const categorias = await parametroClimaService.getAllCategorias();

        res.status(200).json({
            success: true,
            message: 'Categorías obtenidas',
            data: categorias
        });

    } catch (error) {
        console.error('Error en getAllCategorias controller:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorías',
            error: error.message
        });
    }
};