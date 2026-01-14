const zonaHorariaService = require('../services/zonaHoraria.service');

/**
 * Obtener todas las zonas horarias
 */
exports.getAllZonasHorarias = async (req, res) => {
    try {
        const zonas = await zonaHorariaService.getAllZonasHorarias();

        res.status(200).json({
            success: true,
            message: 'Zonas horarias obtenidas',
            count: zonas.length,
            data: zonas
        });

    } catch (error) {
        console.error('Error en getAllZonasHorarias controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener zona horaria por ID
 */
exports.getZonaHorariaById = async (req, res) => {
    try {
        const { id } = req.params;

        const zona = await zonaHorariaService.getZonaHorariaById(parseInt(id));

        res.status(200).json({
            success: true,
            message: 'Zona horaria obtenida',
            data: zona
        });

    } catch (error) {
        console.error('Error en getZonaHorariaById controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Buscar zona horaria por nombre
 */
exports.getZonaHorariaByNombre = async (req, res) => {
    try {
        const { nombre } = req.query;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'Nombre de zona horaria es requerido'
            });
        }

        const zona = await zonaHorariaService.getZonaHorariaByNombre(nombre);

        res.status(200).json({
            success: true,
            message: 'Zona horaria obtenida',
            data: zona
        });

    } catch (error) {
        console.error('Error en getZonaHorariaByNombre controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener zonas horarias por offset
 */
exports.getZonasHorariasByOffset = async (req, res) => {
    try {
        const { offset } = req.query;

        if (offset === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Offset es requerido'
            });
        }

        const zonas = await zonaHorariaService.getZonasHorariasByOffset(parseFloat(offset));

        res.status(200).json({
            success: true,
            message: 'Zonas horarias obtenidas',
            count: zonas.length,
            data: zonas
        });

    } catch (error) {
        console.error('Error en getZonasHorariasByOffset controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener zona horaria más cercana a un offset dado
 */
exports.getZonaHorariaCercana = async (req, res) => {
    try {
        const { offset } = req.query;

        if (offset === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Offset es requerido'
            });
        }

        const zona = await zonaHorariaService.getZonaHorariaCercana(parseFloat(offset));

        res.status(200).json({
            success: true,
            message: 'Zona horaria cercana obtenida',
            data: zona
        });

    } catch (error) {
        console.error('Error en getZonaHorariaCercana controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};