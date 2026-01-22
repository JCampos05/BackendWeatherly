const { PreferenciaUsuarioClima, ParametroClima, Usuario } = require('../models');

class PreferenciaUsuarioClimaService {
    /**
     * Obtener todas las preferencias climáticas del usuario
     */
    async getPreferenciasClima(idUsuario) {
        try {
            const preferencias = await PreferenciaUsuarioClima.findAll({
                where: { idUsuario },
                include: [{
                    model: ParametroClima,
                    as: 'parametroClima'
                }],
                order: [['ordenVisualizacion', 'ASC']]
            });

            return preferencias;

        } catch (error) {
            console.error('Error en getPreferenciasClima:', error.message);
            throw error;
        }
    }

    /**
     * Obtener preferencias climáticas activas del usuario
     */
    async getPreferenciasActivas(idUsuario) {
        try {
            const preferencias = await PreferenciaUsuarioClima.findAll({
                where: { 
                    idUsuario,
                    estaActivo: true 
                },
                include: [{
                    model: ParametroClima,
                    as: 'parametroClima'
                }],
                order: [['ordenVisualizacion', 'ASC']]
            });

            return preferencias;

        } catch (error) {
            console.error('Error en getPreferenciasActivas:', error.message);
            throw error;
        }
    }

    /**
     * Crear o actualizar preferencia climática
     */
    async createOrUpdatePreferencia(idUsuario, idParametroClima, data) {
        try {
            // Verificar que el parámetro existe
            const parametro = await ParametroClima.findByPk(idParametroClima);
            if (!parametro) {
                throw new Error('Parámetro climático no encontrado');
            }

            let preferencia = await PreferenciaUsuarioClima.findOne({
                where: { idUsuario, idParametroClima }
            });

            if (preferencia) {
                // Actualizar existente
                const datosActualizar = {};
                
                if (data.estaActivo !== undefined) {
                    datosActualizar.estaActivo = data.estaActivo;
                }
                if (data.ordenVisualizacion !== undefined) {
                    datosActualizar.ordenVisualizacion = data.ordenVisualizacion;
                }
                if (data.configuracionAdicional !== undefined) {
                    datosActualizar.configuracionAdicional = data.configuracionAdicional;
                }

                await preferencia.update(datosActualizar);
                
            } else {
                // Crear nueva
                preferencia = await PreferenciaUsuarioClima.create({
                    idUsuario,
                    idParametroClima,
                    estaActivo: data.estaActivo !== undefined ? data.estaActivo : true,
                    ordenVisualizacion: data.ordenVisualizacion || 0,
                    configuracionAdicional: data.configuracionAdicional || null
                });
            }

            // Recargar con el parámetro incluido
            await preferencia.reload({
                include: [{
                    model: ParametroClima,
                    as: 'parametroClima'
                }]
            });

            console.log(`Preferencia climática actualizada: usuario ${idUsuario}, parámetro ${idParametroClima}`);

            return preferencia;

        } catch (error) {
            console.error('Error en createOrUpdatePreferencia:', error.message);
            throw error;
        }
    }

    /**
     * Actualizar múltiples preferencias climáticas
     */
    async updateMultiplePreferencias(idUsuario, preferencias) {
        try {
            const resultados = [];

            for (const pref of preferencias) {
                const { idParametroClima, estaActivo, ordenVisualizacion, configuracionAdicional } = pref;
                
                const resultado = await this.createOrUpdatePreferencia(
                    idUsuario,
                    idParametroClima,
                    { estaActivo, ordenVisualizacion, configuracionAdicional }
                );

                resultados.push(resultado);
            }

            console.log(`${resultados.length} preferencias actualizadas para usuario ${idUsuario}`);

            return resultados;

        } catch (error) {
            console.error('Error en updateMultiplePreferencias:', error.message);
            throw error;
        }
    }

    /**
     * Eliminar preferencia climática
     */
    async deletePreferencia(idUsuario, idParametroClima) {
        try {
            const preferencia = await PreferenciaUsuarioClima.findOne({
                where: { idUsuario, idParametroClima }
            });

            if (!preferencia) {
                throw new Error('Preferencia no encontrada');
            }

            await preferencia.destroy();

            console.log(`Preferencia eliminada: usuario ${idUsuario}, parámetro ${idParametroClima}`);

            return { message: 'Preferencia eliminada correctamente' };

        } catch (error) {
            console.error('Error en deletePreferencia:', error.message);
            throw error;
        }
    }

    /**
     * Restablecer preferencias climáticas a valores por defecto
     */
    async resetPreferenciasClima(idUsuario) {
        try {
            // Eliminar todas las preferencias existentes
            await PreferenciaUsuarioClima.destroy({
                where: { idUsuario }
            });

            // Obtener parámetros básicos/gratuitos
            const parametrosBasicos = await ParametroClima.findAll({
                where: { esParametroPremium: false },
                limit: 5
            });

            // Crear preferencias por defecto
            const preferenciasDefault = [];
            for (let i = 0; i < parametrosBasicos.length; i++) {
                const pref = await PreferenciaUsuarioClima.create({
                    idUsuario,
                    idParametroClima: parametrosBasicos[i].idParametroClima,
                    estaActivo: true,
                    ordenVisualizacion: i
                });

                await pref.reload({
                    include: [{
                        model: ParametroClima,
                        as: 'parametroClima'
                    }]
                });

                preferenciasDefault.push(pref);
            }

            console.log(`Preferencias climáticas restablecidas para usuario ${idUsuario}`);

            return preferenciasDefault;

        } catch (error) {
            console.error('Error en resetPreferenciasClima:', error.message);
            throw error;
        }
    }

    /**
     * Activar/Desactivar parámetro
     * CORREGIDO: Ahora crea la preferencia si no existe
     */
    async toggleParametro(idUsuario, idParametroClima, estaActivo) {
        try {
            // Verificar que el parámetro existe
            const parametro = await ParametroClima.findByPk(idParametroClima);
            if (!parametro) {
                throw new Error('Parámetro climático no encontrado');
            }

            let preferencia = await PreferenciaUsuarioClima.findOne({
                where: { idUsuario, idParametroClima }
            });

            if (!preferencia) {
                // Si no existe, crear nueva preferencia
                // Obtener el máximo orden actual
                const maxOrden = await PreferenciaUsuarioClima.max('ordenVisualizacion', {
                    where: { idUsuario }
                });
                
                preferencia = await PreferenciaUsuarioClima.create({
                    idUsuario,
                    idParametroClima,
                    estaActivo,
                    ordenVisualizacion: (maxOrden || 0) + 1 // Siguiente orden disponible
                });
            } else {
                // Si existe, actualizar
                await preferencia.update({ estaActivo });
            }

            await preferencia.reload({
                include: [{
                    model: ParametroClima,
                    as: 'parametroClima'
                }]
            });

            console.log(`Parámetro ${estaActivo ? 'activado' : 'desactivado'}: usuario ${idUsuario}, parámetro ${idParametroClima}`);

            return preferencia;

        } catch (error) {
            console.error('Error en toggleParametro:', error.message);
            throw error;
        }
    }

    /**
     * Reordenar parámetros
     */
    async reordenarParametros(idUsuario, parametrosOrdenados) {
        try {
            const resultados = [];

            for (const item of parametrosOrdenados) {
                const { idParametroClima, ordenVisualizacion } = item;

                const preferencia = await PreferenciaUsuarioClima.findOne({
                    where: { idUsuario, idParametroClima }
                });

                if (preferencia) {
                    await preferencia.update({ ordenVisualizacion });
                    resultados.push(preferencia);
                }
            }

            console.log(`Parámetros reordenados para usuario ${idUsuario}`);

            return resultados;

        } catch (error) {
            console.error('Error en reordenarParametros:', error.message);
            throw error;
        }
    }
}

module.exports = new PreferenciaUsuarioClimaService();