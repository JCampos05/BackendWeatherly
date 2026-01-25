const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ParametroClima = sequelize.define('ParametroClima', {
    idParametroClima: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    codigoParametro: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: 'Ej: temperature_2m, precipitation'
    },
    nombreParametro: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nombre legible: Temperatura'
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    categoriaParametro: {
        type: DataTypes.ENUM('temperatura', 'precipitacion', 'viento', 'humedad', 'presion', 'radiacion', 'nubosidad', 'visibilidad', 'astronomia', 'otros'),
        defaultValue: 'otros',
        comment: 'DEPRECATED - Usar idCategoriaParametro'
    },
    idCategoriaParametro: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
            model: 'categoriasParametros',
            key: 'idCategoriaParametro'
        }
    },
    iconoParametro: {
        type: DataTypes.STRING(50),
        comment: 'Nombre del icono o clase CSS'
    },
    esParametroPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Requiere suscripción'
    },
    esObligatorio: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Parámetro crítico que no se puede desactivar'
    },
    fechaCreado: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fechaActualizado: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'parametrosClima',
    timestamps: false,
    indexes: [
        { fields: ['codigoParametro'] },
        { fields: ['categoriaParametro'] },
        { fields: ['idCategoriaParametro'] }
    ]
});

module.exports = ParametroClima;