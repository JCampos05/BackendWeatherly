const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ubicacion = sequelize.define('Ubicacion', {
    idUbicacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        comment: 'Un usuario = una ubicación principal'
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
        type: DataTypes.SMALLINT,
        comment: 'Metros sobre el nivel del mar'
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
    direccionCompleta: {
        type: DataTypes.TEXT
    },
    esUbicacionManual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Manual o por geolocalización'
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
    tableName: 'ubicaciones',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario'] },
        { fields: ['latitud', 'longitud'] }
    ]
});

module.exports = Ubicacion;