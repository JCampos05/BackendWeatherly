const { PreferenciaUsuario, Usuario } = require('../models');

class PreferenciaUsuarioService {
    /**
     * Obtener preferencias del usuario
     */
    async getPreferencias(idUsuario) {
        try {
            let preferencias = await PreferenciaUsuario.findOne({
                where: { idUsuario }
            });

            if (!preferencias) {
                // Crear preferencias por defecto si no existen
                preferencias = await PreferenciaUsuario.create({
                    idUsuario
                });
            }

            return preferencias;

        } catch (error) {
            console.error('Error en getPreferencias:', error.message);
            throw error;
        }
    }

    /**
     * Actualizar preferencias del usuario
     */
    async updatePreferencias(idUsuario, updateData) {
        try {
            let preferencias = await PreferenciaUsuario.findOne({
                where: { idUsuario }
            });

            if (!preferencias) {
                // Crear si no existen
                preferencias = await PreferenciaUsuario.create({
                    idUsuario,
                    ...updateData
                });
            } else {
                // Actualizar campos permitidos
                const camposPermitidos = [
                    'recibirNotificaciones',
                    'frecuenciaNotificaciones',
                    'horarioNoMolestar',
                    'diasPronostico',
                    'horasPronostico',
                    'intervaloActualizacion',
                    'unidadTemperatura',
                    'unidadVelocidad',
                    'unidadPresion',
                    'unidadPrecipitacion',
                    'unidadDistancia',
                    'temaInterfaz',
                    'idiomaPreferido',
                    'formatoHora',
                    'formatoFecha',
                    'usarDatosMoviles'
                ];

                const datosActualizar = {};
                camposPermitidos.forEach(campo => {
                    if (updateData[campo] !== undefined) {
                        datosActualizar[campo] = updateData[campo];
                    }
                });

                await preferencias.update(datosActualizar);
            }

            console.log(`Preferencias actualizadas para usuario: ${idUsuario}`);

            return preferencias;

        } catch (error) {
            console.error('Error en updatePreferencias:', error.message);
            throw error;
        }
    }

    /**
     * Restablecer preferencias a valores por defecto
     */
    async resetPreferencias(idUsuario) {
        try {
            const preferencias = await PreferenciaUsuario.findOne({
                where: { idUsuario }
            });

            if (!preferencias) {
                throw new Error('Preferencias no encontradas');
            }

            // Valores por defecto según la BD
            await preferencias.update({
                recibirNotificaciones: true,
                frecuenciaNotificaciones: 'todas',
                horarioNoMolestar: null,
                diasPronostico: 7,
                horasPronostico: 24,
                intervaloActualizacion: 30,
                unidadTemperatura: 'celsius',
                unidadVelocidad: 'kmh',
                unidadPresion: 'hpa',
                unidadPrecipitacion: 'mm',
                unidadDistancia: 'km',
                temaInterfaz: 'auto',
                idiomaPreferido: 'es',
                formatoHora: '24h',
                formatoFecha: 'DD/MM/YYYY',
                usarDatosMoviles: true
            });

            console.log(`Preferencias restablecidas para usuario: ${idUsuario}`);

            return preferencias;

        } catch (error) {
            console.error('Error en resetPreferencias:', error.message);
            throw error;
        }
    }
}

module.exports = new PreferenciaUsuarioService();