const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pais = sequelize.define('Pais', {
    idPais: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    codigoPais: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        unique: true,
        comment: 'ISO 3166-1 alpha-2 (MX, US, ES, etc.)'
    },
    nombrePais: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    banderaUrl: {
        type: DataTypes.STRING(255),
        comment: 'URL de la bandera o código emoji'
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
    tableName: 'paises',
    timestamps: false,
    indexes: [
        { fields: ['codigoPais'] }
    ]
});

module.exports = Pais;