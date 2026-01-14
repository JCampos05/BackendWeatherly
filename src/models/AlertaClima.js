const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AlertaClima = sequelize.define('AlertaClima', {
    idAlerta: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    idUbicacionGuardada: {
        type: DataTypes.INTEGER.UNSIGNED,
        comment: 'NULL = ubicación principal'
    },
    idParametroClima: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    tipoAlerta: {
        type: DataTypes.ENUM('umbral_superior', 'umbral_inferior', 'cambio_brusco', 'pronostico'),
        defaultValue: 'umbral_superior'
    },
    valorUmbral: {
        type: DataTypes.DECIMAL(10, 2)
    },
    condicion: {
        type: DataTypes.STRING(50),
        comment: 'mayor_que, menor_que, igual_a, entre'
    },
    mensajePersonalizado: {
        type: DataTypes.STRING(255),
        comment: 'Mensaje custom del usuario'
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
    tableName: 'alertasClima',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario'] },
        { fields: ['estaActiva'] }
    ]
});

module.exports = AlertaClima;