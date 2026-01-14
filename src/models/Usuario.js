const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombreUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100)
    },
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Hash bcrypt'
    },
    tokenRecuperacion: {
        type: DataTypes.STRING(255)
    },
    expiracionToken: {
        type: DataTypes.DATE
    },
    estadoCuenta: {
        type: DataTypes.ENUM('activo', 'inactivo', 'suspendido'),
        defaultValue: 'activo'
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
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
        { fields: ['correo'] },
        { fields: ['nombreUsuario'] }
    ]
});

module.exports = Usuario;