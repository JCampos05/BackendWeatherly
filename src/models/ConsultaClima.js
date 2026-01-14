const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ConsultaClima = sequelize.define('ConsultaClima', {
    idConsulta: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    parametrosConsultados: {
        type: DataTypes.JSON,
        comment: 'Array de parámetros solicitados'
    },
    respuestaApi: {
        type: DataTypes.JSON,
        comment: 'Respuesta de la API'
    },
    fechaConsulta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    tiempoRespuesta: {
        type: DataTypes.SMALLINT.UNSIGNED,
        comment: 'Milisegundos'
    },
    fechaExpiracion: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'TTL para cache - Ej: 15 min para datos actuales'
    }
}, {
    tableName: 'consultasClima',
    timestamps: false,
    indexes: [
        { fields: ['latitud', 'longitud', 'fechaConsulta'] },
        { fields: ['fechaExpiracion'] },
        { fields: ['idUsuario', 'fechaConsulta'] }
    ]
});

module.exports = ConsultaClima;