const { Pais } = require('../models');
const { Op } = require('sequelize');

class PaisService {
    /**
     * Obtener todos los países
     */
    async getAllPaises() {
        try {
            const paises = await Pais.findAll({
                order: [['nombrePais', 'ASC']]
            });

            return paises;

        } catch (error) {
            console.error('Error en getAllPaises:', error.message);
            throw error;
        }
    }

    /**
     * Obtener país por ID
     */
    async getPaisById(idPais) {
        try {
            const pais = await Pais.findByPk(idPais);

            if (!pais) {
                throw new Error('País no encontrado');
            }

            return pais;

        } catch (error) {
            console.error('Error en getPaisById:', error.message);
            throw error;
        }
    }

    /**
     * Buscar país por código ISO (MX, US, ES, etc.)
     */
    async getPaisByCodigo(codigoPais) {
        try {
            const pais = await Pais.findOne({
                where: { codigoPais: codigoPais.toUpperCase() }
            });

            if (!pais) {
                throw new Error('País no encontrado');
            }

            return pais;

        } catch (error) {
            console.error('Error en getPaisByCodigo:', error.message);
            throw error;
        }
    }

    /**
     * Buscar países por nombre (búsqueda parcial)
     */
    async searchPaisesByNombre(termino) {
        try {
            const paises = await Pais.findAll({
                where: {
                    nombrePais: {
                        [Op.like]: `%${termino}%`
                    }
                },
                order: [['nombrePais', 'ASC']],
                limit: 20
            });

            return paises;

        } catch (error) {
            console.error('Error en searchPaisesByNombre:', error.message);
            throw error;
        }
    }

    /**
     * Obtener países por región/continente
     * Útil para agrupar países por zona geográfica
     */
    async getPaisesByRegion(region) {
        try {
            const regionesCodigos = {
                'norte-america': ['US', 'CA', 'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA'],
                'sur-america': ['CO', 'VE', 'GY', 'SR', 'GF', 'BR', 'EC', 'PE', 'BO', 'PY', 'CL', 'AR', 'UY'],
                'europa': ['GB', 'IE', 'FR', 'ES', 'PT', 'AD', 'MC', 'BE', 'NL', 'LU', 'CH', 'LI', 'DE', 'AT', 'IT', 'SM', 'VA', 'MT', 'IS', 'NO', 'SE', 'FI', 'DK', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'MD', 'UA', 'BY', 'RU', 'GR', 'AL', 'MK', 'RS', 'ME', 'BA', 'HR', 'SI', 'XK', 'EE', 'LV', 'LT'],
                'asia': ['TR', 'CY', 'SY', 'LB', 'IL', 'PS', 'JO', 'IQ', 'KW', 'SA', 'BH', 'QA', 'AE', 'OM', 'YE', 'IR', 'AM', 'AZ', 'GE', 'KZ', 'UZ', 'TM', 'TJ', 'KG', 'AF', 'PK', 'IN', 'LK', 'MV', 'NP', 'BT', 'BD', 'MM', 'TH', 'LA', 'KH', 'VN', 'MY', 'SG', 'BN', 'ID', 'TL', 'PH', 'CN', 'MN', 'KP', 'KR', 'JP', 'TW', 'HK', 'MO'],
                'africa': ['EG', 'LY', 'TN', 'DZ', 'MA', 'EH', 'MR', 'SD', 'SS', 'SN', 'GM', 'GW', 'GN', 'SL', 'LR', 'CI', 'ML', 'BF', 'NE', 'NG', 'BJ', 'TG', 'GH', 'TD', 'CF', 'CM', 'GQ', 'GA', 'CG', 'CD', 'AO', 'ER', 'ET', 'DJ', 'SO', 'KE', 'UG', 'RW', 'BI', 'TZ', 'MZ', 'MW', 'ZM', 'ZW', 'MG', 'MU', 'SC', 'KM', 'NA', 'BW', 'ZA', 'LS', 'SZ'],
                'oceania': ['AU', 'NZ', 'PG', 'FJ', 'SB', 'VU', 'NC', 'PF', 'WS', 'TO', 'KI', 'TV', 'NR', 'PW', 'FM', 'MH', 'GU', 'AS', 'MP']
            };

            const codigos = regionesCodigos[region.toLowerCase()];

            if (!codigos) {
                throw new Error('Región no válida');
            }

            const paises = await Pais.findAll({
                where: {
                    codigoPais: {
                        [Op.in]: codigos
                    }
                },
                order: [['nombrePais', 'ASC']]
            });

            return paises;

        } catch (error) {
            console.error('Error en getPaisesByRegion:', error.message);
            throw error;
        }
    }

    /**
     * Obtener países más comunes/populares
     * Útil para mostrar primero en selects
     */
    async getPaisesComunes() {
        try {
            const paisesComunes = ['MX', 'US', 'CA', 'ES', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR'];

            const paises = await Pais.findAll({
                where: {
                    codigoPais: {
                        [Op.in]: paisesComunes
                    }
                },
                order: [['nombrePais', 'ASC']]
            });

            return paises;

        } catch (error) {
            console.error('Error en getPaisesComunes:', error.message);
            throw error;
        }
    }
}

module.exports = new PaisService();