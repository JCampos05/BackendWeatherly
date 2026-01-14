const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HistorialNotificacion = sequelize.define('HistorialNotificacion', {
    idNotificacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idAlerta: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    tipoNotificacion: {
        type: DataTypes.ENUM('push', 'in_app'),
        defaultValue: 'push'
    },
    tituloNotificacion: {
        type: DataTypes.STRING(150)
    },
    mensajeNotificacion: {
        type: DataTypes.TEXT
    },
    datosAdicionales: {
        type: DataTypes.JSON,
        comment: 'Datos del clima que activaron la alerta'
    },
    fueLeida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fechaEnvio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fechaLectura: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'historialNotificaciones',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario', 'fechaEnvio'] },
        { fields: ['fueLeida'] }
    ]
});

module.exports = HistorialNotificacion;