const ubicacionService = require('../services/ubicacion.service');

/**
 * Obtener ubicación principal del usuario
 */
exports.getUbicacionPrincipal = async (req, res) => {
    try {
        const ubicacion = await ubicacionService.getUbicacionPrincipal(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Ubicación principal obtenida',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en getUbicacionPrincipal controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Crear o actualizar ubicación principal
 */
exports.setUbicacionPrincipal = async (req, res) => {
    try {
        const {
            latitud,
            longitud,
            altitud,
            ciudad,
            estado,
            idPais,
            codigoPostal,
            idZonaHoraria,
            direccionCompleta,
            esUbicacionManual
        } = req.body;

        if (!latitud || !longitud) {
            return res.status(400).json({
                success: false,
                message: 'Latitud y longitud son requeridas'
            });
        }

        const ubicacion = await ubicacionService.setUbicacionPrincipal(req.usuario.idUsuario, {
            latitud,
            longitud,
            altitud,
            ciudad,
            estado,
            idPais,
            codigoPostal,
            idZonaHoraria,
            direccionCompleta,
            esUbicacionManual
        });

        res.status(200).json({
            success: true,
            message: 'Ubicación principal guardada',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en setUbicacionPrincipal controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Eliminar ubicación principal
 */
exports.deleteUbicacionPrincipal = async (req, res) => {
    try {
        const result = await ubicacionService.deleteUbicacionPrincipal(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en deleteUbicacionPrincipal controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener todas las ubicaciones guardadas
 */
exports.getUbicacionesGuardadas = async (req, res) => {
    try {
        const ubicaciones = await ubicacionService.getUbicacionesGuardadas(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Ubicaciones guardadas obtenidas',
            count: ubicaciones.length,
            data: ubicaciones
        });

    } catch (error) {
        console.error('Error en getUbicacionesGuardadas controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Obtener una ubicación guardada específica
 */
exports.getUbicacionGuardada = async (req, res) => {
    try {
        const { id } = req.params;

        const ubicacion = await ubicacionService.getUbicacionGuardada(
            req.usuario.idUsuario,
            parseInt(id)
        );

        res.status(200).json({
            success: true,
            message: 'Ubicación guardada obtenida',
            data: ubicacion
        });

    } catch (error) {
        console.error('Error en getUbicacionGuardada controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Crear nueva ubicación guardada
 */
exports.createUbicacionGuardada = async (req, res) => {
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

        const ubicacion = await ubicacionService.createUbicacionGuardada(req.usuario.idUsuario, {
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
        console.error('Error en createUbicacionGuardada controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Actualizar ubicación guardada
 */
exports.updateUbicacionGuardada = async (req, res) => {
    try {
        const { id } = req.params;

        const ubicacion = await ubicacionService.updateUbicacionGuardada(
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
        console.error('Error en updateUbicacionGuardada controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Eliminar ubicación guardada
 */
exports.deleteUbicacionGuardada = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ubicacionService.deleteUbicacionGuardada(
            req.usuario.idUsuario,
            parseInt(id)
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en deleteUbicacionGuardada controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Reordenar ubicaciones guardadas
 */
exports.reorderUbicaciones = async (req, res) => {
    try {
        const { ordenamiento } = req.body;

        if (!Array.isArray(ordenamiento)) {
            return res.status(400).json({
                success: false,
                message: 'Ordenamiento debe ser un array'
            });
        }

        const result = await ubicacionService.reorderUbicaciones(
            req.usuario.idUsuario,
            ordenamiento
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en reorderUbicaciones controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};