const paisService = require('../services/pais.service');

/**
 * Obtener todos los países
 */
exports.getAllPaises = async (req, res) => {
    try {
        const paises = await paisService.getAllPaises();

        res.status(200).json({
            success: true,
            message: 'Países obtenidos',
            count: paises.length,
            data: paises
        });

    } catch (error) {
        console.error('Error en getAllPaises controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener país por ID
 */
exports.getPaisById = async (req, res) => {
    try {
        const { id } = req.params;

        const pais = await paisService.getPaisById(parseInt(id));

        res.status(200).json({
            success: true,
            message: 'País obtenido',
            data: pais
        });

    } catch (error) {
        console.error('Error en getPaisById controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Buscar país por código ISO
 */
exports.getPaisByCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;

        if (!codigo || codigo.length !== 2) {
            return res.status(400).json({
                success: false,
                message: 'Código de país debe ser de 2 caracteres (ISO 3166-1 alpha-2)'
            });
        }

        const pais = await paisService.getPaisByCodigo(codigo);

        res.status(200).json({
            success: true,
            message: 'País obtenido',
            data: pais
        });

    } catch (error) {
        console.error('Error en getPaisByCodigo controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Buscar países por nombre
 */
exports.searchPaisesByNombre = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'El término de búsqueda debe tener al menos 2 caracteres'
            });
        }

        const paises = await paisService.searchPaisesByNombre(q);

        res.status(200).json({
            success: true,
            message: 'Búsqueda completada',
            count: paises.length,
            data: paises
        });

    } catch (error) {
        console.error('Error en searchPaisesByNombre controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener países por región
 */
exports.getPaisesByRegion = async (req, res) => {
    try {
        const { region } = req.params;

        const regionesValidas = ['norte-america', 'sur-america', 'europa', 'asia', 'africa', 'oceania'];
        
        if (!regionesValidas.includes(region.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Región no válida. Opciones: ${regionesValidas.join(', ')}`
            });
        }

        const paises = await paisService.getPaisesByRegion(region);

        res.status(200).json({
            success: true,
            message: `Países de ${region} obtenidos`,
            count: paises.length,
            data: paises
        });

    } catch (error) {
        console.error('Error en getPaisesByRegion controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener países comunes/populares
 */
exports.getPaisesComunes = async (req, res) => {
    try {
        const paises = await paisService.getPaisesComunes();

        res.status(200).json({
            success: true,
            message: 'Países comunes obtenidos',
            count: paises.length,
            data: paises
        });

    } catch (error) {
        console.error('Error en getPaisesComunes controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};