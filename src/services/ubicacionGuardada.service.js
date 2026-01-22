const { UbicacionGuardada, Pais, ZonaHoraria, Usuario } = require('../models');

class UbicacionGuardadaService {
    /**
     * Obtener todas las ubicaciones guardadas del usuario
     */
    async getAllByUser(idUsuario) {
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
            console.error('Error en getAllByUser:', error.message);
            throw error;
        }
    }

    /**
     * Obtener una ubicación guardada específica
     */
    async getById(idUsuario, idUbicacionGuardada) {
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
            console.error('Error en getById:', error.message);
            throw error;
        }
    }

    /**
     * Crear nueva ubicación guardada
     */
    async create(idUsuario, ubicacionData) {
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

            // Verificar que el usuario existe
            const usuario = await Usuario.findByPk(idUsuario);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Verificar que el nombre no exista para este usuario
            if (nombrePersonalizado) {
                const existeNombre = await UbicacionGuardada.findOne({
                    where: {
                        idUsuario,
                        nombrePersonalizado
                    }
                });

                if (existeNombre) {
                    throw new Error('Ya existe una ubicación con ese nombre');
                }
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
            console.error('Error en create:', error.message);
            throw error;
        }
    }

    /**
     * Actualizar ubicación guardada
     */
    async update(idUsuario, idUbicacionGuardada, updateData) {
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
            console.error('Error en update:', error.message);
            throw error;
        }
    }

    /**
     * Eliminar ubicación guardada
     */
    async delete(idUsuario, idUbicacionGuardada) {
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
            console.error('Error en delete:', error.message);
            throw error;
        }
    }

    /**
     * Reordenar ubicaciones guardadas
     */
    async reorder(idUsuario, ordenamiento) {
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
            console.error('Error en reorder:', error.message);
            throw error;
        }
    }
}

module.exports = new UbicacionGuardadaService();