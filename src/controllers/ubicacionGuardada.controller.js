const ubicacionGuardadaService = require('../services/ubicacionGuardada.service');

/**
 * Obtener todas las ubicaciones guardadas del usuario
 */
exports.getAllByUser = async (req, res) => {
    try {
        const ubicaciones = await ubicacionGuardadaService.getAllByUser(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Ubicaciones guardadas obtenidas',
            count: ubicaciones.length,
            data: ubicaciones
        });

    } catch (error) {
        console.error('Error en getAllByUser controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener una ubicación guardada específica
 */
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const ubicacion = await ubicacionGuardadaService.getById(
            req.usuario.idUsuario,
            parseInt(id)
        );

        res.status(200).json({
            success: true,
            message: 'Ubicación guardada obtenida',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en getById controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Crear nueva ubicación guardada
 */
exports.create = async (req, res) => {
    try {
        const {
            nombrePersonalizado,
            latitud,
            longitud,
            altitud,
            ciudad,
            estado,
            idPais,
            codigoPostal,
            idZonaHoraria,
            esUbicacionPrincipal,
            ordenVisualizacion
        } = req.body;

        if (!nombrePersonalizado || !latitud || !longitud) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, latitud y longitud son requeridos'
            });
        }

        const ubicacion = await ubicacionGuardadaService.create(req.usuario.idUsuario, {
            nombrePersonalizado,
            latitud,
            longitud,
            altitud,
            ciudad,
            estado,
            idPais,
            codigoPostal,
            idZonaHoraria,
            esUbicacionPrincipal,
            ordenVisualizacion
        });

        res.status(201).json({
            success: true,
            message: 'Ubicación guardada creada',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en create controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Actualizar ubicación guardada
 */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const ubicacion = await ubicacionGuardadaService.update(
            req.usuario.idUsuario,
            parseInt(id),
            req.body
        );

        res.status(200).json({
            success: true,
            message: 'Ubicación guardada actualizada',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en update controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Eliminar ubicación guardada
 */
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ubicacionGuardadaService.delete(
            req.usuario.idUsuario,
            parseInt(id)
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en delete controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Reordenar ubicaciones guardadas
 */
exports.reorder = async (req, res) => {
    try {
        const { ordenamiento } = req.body;

        if (!Array.isArray(ordenamiento)) {
            return res.status(400).json({
                success: false,
                message: 'Ordenamiento debe ser un array'
            });
        }

        const result = await ubicacionGuardadaService.reorder(
            req.usuario.idUsuario,
            ordenamiento
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en reorder controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};