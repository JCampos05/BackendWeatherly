const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PreferenciaUsuario = sequelize.define('PreferenciaUsuario', {
    idPreferencia: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
    },
    recibirNotificaciones: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Activar/desactivar todas las notificaciones'
    },
    frecuenciaNotificaciones: {
        type: DataTypes.ENUM('todas', 'importante', 'urgente', 'ninguna'),
        defaultValue: 'todas',
        comment: 'Nivel de notificaciones a recibir'
    },
    horarioNoMolestar: {
        type: DataTypes.JSON,
        comment: '{"inicio": "22:00", "fin": "08:00"} - No enviar notificaciones en este rango'
    },
    diasPronostico: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 7,
        comment: 'Días de pronóstico a mostrar (1-14)'
    },
    horasPronostico: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 24,
        comment: 'Horas de pronóstico horario (1-48)'
    },
    intervaloActualizacion: {
        type: DataTypes.SMALLINT.UNSIGNED,
        defaultValue: 30,
        comment: 'Minutos entre actualizaciones automáticas'
    },
    unidadTemperatura: {
        type: DataTypes.ENUM('celsius', 'fahrenheit', 'kelvin'),
        defaultValue: 'celsius'
    },
    unidadVelocidad: {
        type: DataTypes.ENUM('kmh', 'mph', 'ms', 'knots'),
        defaultValue: 'kmh',
        comment: 'km/h, millas/h, m/s, nudos'
    },
    unidadPresion: {
        type: DataTypes.ENUM('hpa', 'mmhg', 'inhg', 'mbar'),
        defaultValue: 'hpa',
        comment: 'Hectopascales, mmHg, inHg, milibar'
    },
    unidadPrecipitacion: {
        type: DataTypes.ENUM('mm', 'inch'),
        defaultValue: 'mm'
    },
    unidadDistancia: {
        type: DataTypes.ENUM('km', 'mi'),
        defaultValue: 'km',
        comment: 'Kilómetros o millas'
    },
    temaInterfaz: {
        type: DataTypes.ENUM('claro', 'oscuro', 'auto'),
        defaultValue: 'auto',
        comment: 'Auto sigue configuración del sistema'
    },
    idiomaPreferido: {
        type: DataTypes.CHAR(2),
        defaultValue: 'es',
        comment: 'Código ISO 639-1 (es, en, fr, etc.)'
    },
    formatoHora: {
        type: DataTypes.ENUM('12h', '24h'),
        defaultValue: '24h'
    },
    formatoFecha: {
        type: DataTypes.ENUM('DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'),
        defaultValue: 'DD/MM/YYYY'
    },
    usarDatosMoviles: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Permitir actualizaciones con datos móviles'
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
    tableName: 'preferenciasUsuario',
    timestamps: false,
    indexes: [
        { fields: ['idUsuario'] }
    ]
});

module.exports = PreferenciaUsuario;