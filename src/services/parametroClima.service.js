const { ParametroClima } = require('../models');

class ParametroClimaService {
    /**
     * Obtener todos los parámetros climáticos disponibles
     */
    async getAllParametros() {
        try {
            const parametros = await ParametroClima.findAll({
                order: [['categoriaParametro', 'ASC'], ['nombreParametro', 'ASC']]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getAllParametros:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetros por categoría
     */
    async getParametrosByCategoria(categoria) {
        try {
            const parametros = await ParametroClima.findAll({
                where: { categoriaParametro: categoria },
                order: [['nombreParametro', 'ASC']]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosByCategoria:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetro por ID
     */
    async getParametroById(idParametroClima) {
        try {
            const parametro = await ParametroClima.findByPk(idParametroClima);

            if (!parametro) {
                throw new Error('Parámetro no encontrado');
            }

            return parametro;

        } catch (error) {
            console.error('Error en getParametroById:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetros gratuitos (no premium)
     */
    async getParametrosGratuitos() {
        try {
            const parametros = await ParametroClima.findAll({
                where: { esParametroPremium: false },
                order: [['categoriaParametro', 'ASC'], ['nombreParametro', 'ASC']]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosGratuitos:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetros premium
     */
    async getParametrosPremium() {
        try {
            const parametros = await ParametroClima.findAll({
                where: { esParametroPremium: true },
                order: [['categoriaParametro', 'ASC'], ['nombreParametro', 'ASC']]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosPremium:', error.message);
            throw error;
        }
    }
}

module.exports = new ParametroClimaService();