const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UbicacionGuardada = sequelize.define('UbicacionGuardada', {
    idUbicacionGuardada: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    nombrePersonalizado: {
        type: DataTypes.STRING(100),
        comment: 'Ej: Casa, Trabajo, Casa de mamá'
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    altitud: {
        type: DataTypes.SMALLINT
    },
    ciudad: {
        type: DataTypes.STRING(100)
    },
    estado: {
        type: DataTypes.STRING(100)
    },
    idPais: {
        type: DataTypes.SMALLINT.UNSIGNED
    },
    codigoPostal: {
        type: DataTypes.STRING(20)
    },
    idZonaHoraria: {
        type: DataTypes.TINYINT.UNSIGNED
    },
    esUbicacionPrincipal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Ubicación por defecto'
    },
    ordenVisualizacion: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: 'Orden en el frontend'
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
    tableName: 'ubicacionesGuardadas',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario'] },
        { fields: ['latitud', 'longitud'] },
        { unique: true, fields: ['idUsuario', 'nombrePersonalizado'] }
    ]
});

module.exports = UbicacionGuardada;