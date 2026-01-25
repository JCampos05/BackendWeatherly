const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CategoriaParametro = sequelize.define('CategoriaParametro', {
    idCategoriaParametro: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    codigoCategoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: 'temperatura, precipitacion, viento, etc.'
    },
    nombreCategoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nombre legible de la categoría'
    },
    descripcionCategoria: {
        type: DataTypes.TEXT,
        comment: 'Descripción de qué incluye esta categoría'
    },
    iconoCategoria: {
        type: DataTypes.STRING(50),
        comment: 'Icono representativo de la categoría'
    },
    colorCategoria: {
        type: DataTypes.STRING(20),
        comment: 'Color hex o nombre para UI'
    },
    ordenVisualizacion: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: 'Orden de aparición en el UI'
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
    tableName: 'categoriasParametros',
    timestamps: false,
    indexes: [
        { fields: ['codigoCategoria'] },
        { fields: ['ordenVisualizacion'] }
    ]
});

module.exports = CategoriaParametro;