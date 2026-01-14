const { Ubicacion, UbicacionGuardada, Pais, ZonaHoraria, Usuario } = require('../models');

class UbicacionService {
    /**
     * Obtener ubicación principal del usuario
     */
    async getUbicacionPrincipal(idUsuario) {
        try {
            const ubicacion = await Ubicacion.findOne({
                where: { idUsuario },
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ]
            });

            if (!ubicacion) {
                throw new Error('Ubicación principal no encontrada');
            }

            return ubicacion;

        } catch (error) {
            console.error('Error en getUbicacionPrincipal:', error.message);
            throw error;
        }
    }

    /**
     * Crear o actualizar ubicación principal
     */
    async setUbicacionPrincipal(idUsuario, ubicacionData) {
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
            } = ubicacionData;

            // Verificar que el usuario existe
            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Buscar ubicación existente
            let ubicacion = await Ubicacion.findOne({
                where: { idUsuario }
            });

            if (ubicacion) {
                // Actualizar ubicación existente
                await ubicacion.update({
                    latitud,
                    longitud,
                    altitud,
                    ciudad,
                    estado,
                    idPais,
                    codigoPostal,
                    idZonaHoraria,
                    direccionCompleta,
                    esUbicacionManual: esUbicacionManual !== undefined ? esUbicacionManual : ubicacion.esUbicacionManual
                });

                console.log(`Ubicación principal actualizada para usuario: ${idUsuario}`);
            } else {
                // Crear nueva ubicación
                ubicacion = await Ubicacion.create({
                    idUsuario,
                    latitud,
                    longitud,
                    altitud,
                    ciudad,
                    estado,
                    idPais,
                    codigoPostal,
                    idZonaHoraria,
                    direccionCompleta,
                    esUbicacionManual: esUbicacionManual || false
                });

                console.log(`Ubicación principal creada para usuario: ${idUsuario}`);
            }

            // Recargar con relaciones
            await ubicacion.reload({
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ]
            });

            return ubicacion;

        } catch (error) {
            console.error('Error en setUbicacionPrincipal:', error.message);
            throw error;
        }
    }

    /**
     * Eliminar ubicación principal
     */
    async deleteUbicacionPrincipal(idUsuario) {
        try {
            const ubicacion = await Ubicacion.findOne({
                where: { idUsuario }
            });

            if (!ubicacion) {
                throw new Error('Ubicación principal no encontrada');
            }

            await ubicacion.destroy();

            console.log(`Ubicación principal eliminada para usuario: ${idUsuario}`);

            return { message: 'Ubicación principal eliminada' };

        } catch (error) {
            console.error('Error en deleteUbicacionPrincipal:', error.message);
            throw error;
        }
    }

    /**
     * Obtener todas las ubicaciones guardadas del usuario
     */
    async getUbicacionesGuardadas(idUsuario) {
        try {
            const ubicaciones = await UbicacionGuardada.findAll({
                where: { idUsuario },
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ],
                order: [
                    ['esUbicacionPrincipal', 'DESC'],
                    ['ordenVisualizacion', 'ASC']
                ]
            });

            return ubicaciones;

        } catch (error) {
            console.error('Error en getUbicacionesGuardadas:', error.message);
            throw error;
        }
    }

    /**
     * Obtener una ubicación guardada específica
     */
    async getUbicacionGuardada(idUsuario, idUbicacionGuardada) {
        try {
            const ubicacion = await UbicacionGuardada.findOne({
                where: {
                    idUbicacionGuardada,
                    idUsuario
                },
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ]
            });

            if (!ubicacion) {
                throw new Error('Ubicación guardada no encontrada');
            }

            return ubicacion;

        } catch (error) {
            console.error('Error en getUbicacionGuardada:', error.message);
            throw error;
        }
    }

    /**
     * Crear nueva ubicación guardada
     */
    async createUbicacionGuardada(idUsuario, ubicacionData) {
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
            } = ubicacionData;

            // Verificar que el nombre no exista para este usuario
            const existeNombre = await UbicacionGuardada.findOne({
                where: {
                    idUsuario,
                    nombrePersonalizado
                }
            });

            if (existeNombre) {
                throw new Error('Ya existe una ubicación con ese nombre');
            }

            // Si se marca como principal, desmarcar otras
            if (esUbicacionPrincipal) {
                await UbicacionGuardada.update(
                    { esUbicacionPrincipal: false },
                    { where: { idUsuario } }
                );
            }

            const ubicacion = await UbicacionGuardada.create({
                idUsuario,
                nombrePersonalizado,
                latitud,
                longitud,
                altitud,
                ciudad,
                estado,
                idPais,
                codigoPostal,
                idZonaHoraria,
                esUbicacionPrincipal: esUbicacionPrincipal || false,
                ordenVisualizacion: ordenVisualizacion || 0
            });

            console.log(`Ubicación guardada creada: ${nombrePersonalizado} (Usuario: ${idUsuario})`);

            // Recargar con relaciones
            await ubicacion.reload({
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ]
            });

            return ubicacion;

        } catch (error) {
            console.error('Error en createUbicacionGuardada:', error.message);
            throw error;
        }
    }

    /**
     * Actualizar ubicación guardada
     */
    async updateUbicacionGuardada(idUsuario, idUbicacionGuardada, updateData) {
        try {
            const ubicacion = await UbicacionGuardada.findOne({
                where: {
                    idUbicacionGuardada,
                    idUsuario
                }
            });

            if (!ubicacion) {
                throw new Error('Ubicación guardada no encontrada');
            }

            // Si se cambia el nombre, verificar que no exista
            if (updateData.nombrePersonalizado && updateData.nombrePersonalizado !== ubicacion.nombrePersonalizado) {
                const existeNombre = await UbicacionGuardada.findOne({
                    where: {
                        idUsuario,
                        nombrePersonalizado: updateData.nombrePersonalizado
                    }
                });

                if (existeNombre) {
                    throw new Error('Ya existe una ubicación con ese nombre');
                }
            }

            // Si se marca como principal, desmarcar otras
            if (updateData.esUbicacionPrincipal && !ubicacion.esUbicacionPrincipal) {
                await UbicacionGuardada.update(
                    { esUbicacionPrincipal: false },
                    { where: { idUsuario } }
                );
            }

            await ubicacion.update(updateData);

            console.log(`Ubicación guardada actualizada: ${idUbicacionGuardada}`);

            // Recargar con relaciones
            await ubicacion.reload({
                include: [
                    { model: Pais, as: 'pais' },
                    { model: ZonaHoraria, as: 'zonaHoraria' }
                ]
            });

            return ubicacion;

        } catch (error) {
            console.error('Error en updateUbicacionGuardada:', error.message);
            throw error;
        }
    }

    /**
     * Eliminar ubicación guardada
     */
    async deleteUbicacionGuardada(idUsuario, idUbicacionGuardada) {
        try {
            const ubicacion = await UbicacionGuardada.findOne({
                where: {
                    idUbicacionGuardada,
                    idUsuario
                }
            });

            if (!ubicacion) {
                throw new Error('Ubicación guardada no encontrada');
            }

            await ubicacion.destroy();

            console.log(`Ubicación guardada eliminada: ${idUbicacionGuardada}`);

            return { message: 'Ubicación eliminada correctamente' };

        } catch (error) {
            console.error('Error en deleteUbicacionGuardada:', error.message);
            throw error;
        }
    }

    /**
     * Reordenar ubicaciones guardadas
     */
    async reorderUbicaciones(idUsuario, ordenamiento) {
        try {
            // ordenamiento es un array de { idUbicacionGuardada, ordenVisualizacion }
            const updates = ordenamiento.map(async (item) => {
                await UbicacionGuardada.update(
                    { ordenVisualizacion: item.ordenVisualizacion },
                    {
                        where: {
                            idUbicacionGuardada: item.idUbicacionGuardada,
                            idUsuario
                        }
                    }
                );
            });

            await Promise.all(updates);

            console.log(`Ubicaciones reordenadas para usuario: ${idUsuario}`);

            return { message: 'Ubicaciones reordenadas correctamente' };

        } catch (error) {
            console.error('Error en reorderUbicaciones:', error.message);
            throw error;
        }
    }
}

module.exports = new UbicacionService();