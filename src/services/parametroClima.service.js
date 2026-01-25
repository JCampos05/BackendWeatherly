const { ParametroClima, CategoriaParametro } = require('../models');

class ParametroClimaService {
    /**
     * Obtener todos los parámetros climáticos disponibles CON su categoría
     */
    async getAllParametros() {
        try {
            const parametros = await ParametroClima.findAll({
                include: [
                    {
                        model: CategoriaParametro,
                        as: 'categoria',
                        attributes: ['idCategoriaParametro', 'codigoCategoria', 'nombreCategoria', 'descripcionCategoria', 'iconoCategoria', 'colorCategoria', 'ordenVisualizacion']
                    }
                ],
                order: [
                    [{ model: CategoriaParametro, as: 'categoria' }, 'ordenVisualizacion', 'ASC'],
                    ['nombreParametro', 'ASC']
                ]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getAllParametros:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetros por categoría (usando ID o código)
     */
    async getParametrosByCategoria(categoriaIdentifier) {
        try {
            // Determinar si es ID o código
            const isId = !isNaN(categoriaIdentifier);
            
            const whereClause = isId 
                ? { idCategoriaParametro: categoriaIdentifier }
                : { '$categoria.codigoCategoria$': categoriaIdentifier };

            const parametros = await ParametroClima.findAll({
                include: [
                    {
                        model: CategoriaParametro,
                        as: 'categoria',
                        attributes: ['idCategoriaParametro', 'codigoCategoria', 'nombreCategoria', 'descripcionCategoria', 'iconoCategoria', 'colorCategoria']
                    }
                ],
                where: whereClause,
                order: [['nombreParametro', 'ASC']]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosByCategoria:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetro por ID CON su categoría
     */
    async getParametroById(idParametroClima) {
        try {
            const parametro = await ParametroClima.findByPk(idParametroClima, {
                include: [
                    {
                        model: CategoriaParametro,
                        as: 'categoria',
                        attributes: ['idCategoriaParametro', 'codigoCategoria', 'nombreCategoria', 'descripcionCategoria', 'iconoCategoria', 'colorCategoria']
                    }
                ]
            });

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
     * Obtener parámetros gratuitos (no premium) CON categorías
     */
    async getParametrosGratuitos() {
        try {
            const parametros = await ParametroClima.findAll({
                where: { esParametroPremium: false },
                include: [
                    {
                        model: CategoriaParametro,
                        as: 'categoria',
                        attributes: ['idCategoriaParametro', 'codigoCategoria', 'nombreCategoria', 'iconoCategoria', 'colorCategoria']
                    }
                ],
                order: [
                    [{ model: CategoriaParametro, as: 'categoria' }, 'ordenVisualizacion', 'ASC'],
                    ['nombreParametro', 'ASC']
                ]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosGratuitos:', error.message);
            throw error;
        }
    }

    /**
     * Obtener parámetros premium CON categorías
     */
    async getParametrosPremium() {
        try {
            const parametros = await ParametroClima.findAll({
                where: { esParametroPremium: true },
                include: [
                    {
                        model: CategoriaParametro,
                        as: 'categoria',
                        attributes: ['idCategoriaParametro', 'codigoCategoria', 'nombreCategoria', 'iconoCategoria', 'colorCategoria']
                    }
                ],
                order: [
                    [{ model: CategoriaParametro, as: 'categoria' }, 'ordenVisualizacion', 'ASC'],
                    ['nombreParametro', 'ASC']
                ]
            });

            return parametros;

        } catch (error) {
            console.error('Error en getParametrosPremium:', error.message);
            throw error;
        }
    }

    /**
     * NUEVO: Obtener todas las categorías con conteo de parámetros
     */
    async getAllCategorias() {
        try {
            const categorias = await CategoriaParametro.findAll({
                include: [
                    {
                        model: ParametroClima,
                        as: 'parametros',
                        attributes: ['idParametroClima']
                    }
                ],
                order: [['ordenVisualizacion', 'ASC']]
            });

            // Formatear respuesta con conteo
            return categorias.map(cat => ({
                ...cat.toJSON(),
                cantidadParametros: cat.parametros ? cat.parametros.length : 0
            }));

        } catch (error) {
            console.error('Error en getAllCategorias:', error.message);
            throw error;
        }
    }
}

module.exports = new ParametroClimaService();