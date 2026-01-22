const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PreferenciaUsuarioClima = sequelize.define('PreferenciaUsuarioClima', {
    idPreferenciaClima: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idParametroClima: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    estaActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Si el usuario quiere ver este parámetro'
    },
    ordenVisualizacion: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: 'Orden en el dashboard'
    },
    configuracionAdicional: {
        type: DataTypes.JSON,
        comment: 'Ej: {"umbralAlerta": 35, "colorCustom": "#FF5733"}'
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
    tableName: 'preferenciasUsuarioClima',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['idUsuario', 'idParametroClima'] },
        { fields: ['idUsuario'] },
        { fields: ['estaActivo'] }
    ]
});

module.exports = PreferenciaUsuarioClima;