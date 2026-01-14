const { ZonaHoraria } = require('../models');

class ZonaHorariaService {
    /**
     * Obtener todas las zonas horarias
     */
    async getAllZonasHorarias() {
        try {
            const zonas = await ZonaHoraria.findAll({
                order: [['offsetUTC', 'ASC']]
            });

            return zonas;

        } catch (error) {
            console.error('Error en getAllZonasHorarias:', error.message);
            throw error;
        }
    }

    /**
     * Obtener zona horaria por ID
     */
    async getZonaHorariaById(idZonaHoraria) {
        try {
            const zona = await ZonaHoraria.findByPk(idZonaHoraria);

            if (!zona) {
                throw new Error('Zona horaria no encontrada');
            }

            return zona;

        } catch (error) {
            console.error('Error en getZonaHorariaById:', error.message);
            throw error;
        }
    }

    /**
     * Buscar zona horaria por nombre
     */
    async getZonaHorariaByNombre(nombreZona) {
        try {
            const zona = await ZonaHoraria.findOne({
                where: { nombreZona }
            });

            if (!zona) {
                throw new Error('Zona horaria no encontrada');
            }

            return zona;

        } catch (error) {
            console.error('Error en getZonaHorariaByNombre:', error.message);
            throw error;
        }
    }

    /**
     * Obtener zonas horarias por offset
     */
    async getZonasHorariasByOffset(offsetUTC) {
        try {
            const zonas = await ZonaHoraria.findAll({
                where: { offsetUTC }
            });

            return zonas;

        } catch (error) {
            console.error('Error en getZonasHorariasByOffset:', error.message);
            throw error;
        }
    }

    /**
     * Obtener zona horaria más cercana a un offset dado
     */
    async getZonaHorariaCercana(offsetUTC) {
        try {
            // Redondear el offset al más cercano
            const offsetRedondeado = Math.round(offsetUTC);

            const zona = await ZonaHoraria.findOne({
                where: { offsetUTC: offsetRedondeado }
            });

            if (!zona) {
                // Si no se encuentra, buscar la más cercana
                const todasZonas = await ZonaHoraria.findAll();
                const zonaCercana = todasZonas.reduce((prev, curr) => {
                    return Math.abs(curr.offsetUTC - offsetUTC) < Math.abs(prev.offsetUTC - offsetUTC) ? curr : prev;
                });
                return zonaCercana;
            }

            return zona;

        } catch (error) {
            console.error('Error en getZonaHorariaCercana:', error.message);
            throw error;
        }
    }
}

module.exports = new ZonaHorariaService();