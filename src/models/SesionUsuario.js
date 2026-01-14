const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SesionUsuario = sequelize.define('SesionUsuario', {
    idSesion: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    tokenJWT: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING(255)
    },
    ipAddress: {
        type: DataTypes.STRING(45)
    },
    userAgent: {
        type: DataTypes.STRING(255)
    },
    dispositivoNombre: {
        type: DataTypes.STRING(100),
        comment: 'Ej: iPhone 14, Chrome Windows'
    },
    fechaInicio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fechaExpiracion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estaActiva: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: 'sesionesUsuario',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario'] },
        { fields: ['estaActiva'] },
        { fields: ['fechaExpiracion'] }
    ]
});

module.exports = SesionUsuario;