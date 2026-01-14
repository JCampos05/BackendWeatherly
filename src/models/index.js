const { sequelize } = require('../config/database');

// Importar modelos
const Pais = require('./Pais');
const ZonaHoraria = require('./ZonaHoraria');
const Usuario = require('./Usuario');
const Ubicacion = require('./Ubicacion');
const UbicacionGuardada = require('./UbicacionGuardada');
const ParametroClima = require('./ParametroClima');
const PreferenciaUsuarioClima = require('./PreferenciaUsuarioClima');
const ConsultaClima = require('./ConsultaClima');
const AlertaClima = require('./AlertaClima');
const HistorialNotificacion = require('./HistorialNotificacion');
const SesionUsuario = require('./SesionUsuario');
const PreferenciaUsuario = require('./PreferenciaUsuario');

// Definir relaciones

// Usuario - Ubicacion (1:1)
Usuario.hasOne(Ubicacion, {
    foreignKey: 'idUsuario',
    as: 'ubicacion'
});
Ubicacion.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - UbicacionGuardada (1:N)
Usuario.hasMany(UbicacionGuardada, {
    foreignKey: 'idUsuario',
    as: 'ubicacionesGuardadas'
});
UbicacionGuardada.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - PreferenciaUsuarioClima (1:N)
Usuario.hasMany(PreferenciaUsuarioClima, {
    foreignKey: 'idUsuario',
    as: 'preferenciasClima'
});
PreferenciaUsuarioClima.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - ConsultaClima (1:N)
Usuario.hasMany(ConsultaClima, {
    foreignKey: 'idUsuario',
    as: 'consultas'
});
ConsultaClima.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - AlertaClima (1:N)
Usuario.hasMany(AlertaClima, {
    foreignKey: 'idUsuario',
    as: 'alertas'
});
AlertaClima.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - HistorialNotificacion (1:N)
Usuario.hasMany(HistorialNotificacion, {
    foreignKey: 'idUsuario',
    as: 'notificaciones'
});
HistorialNotificacion.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - SesionUsuario (1:N)
Usuario.hasMany(SesionUsuario, {
    foreignKey: 'idUsuario',
    as: 'sesiones'
});
SesionUsuario.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Usuario - PreferenciaUsuario (1:1)
Usuario.hasOne(PreferenciaUsuario, {
    foreignKey: 'idUsuario',
    as: 'preferencias'
});
PreferenciaUsuario.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Pais - Ubicacion (1:N)
Pais.hasMany(Ubicacion, {
    foreignKey: 'idPais',
    as: 'ubicaciones'
});
Ubicacion.belongsTo(Pais, {
    foreignKey: 'idPais',
    as: 'pais'
});

// Pais - UbicacionGuardada (1:N)
Pais.hasMany(UbicacionGuardada, {
    foreignKey: 'idPais',
    as: 'ubicacionesGuardadas'
});
UbicacionGuardada.belongsTo(Pais, {
    foreignKey: 'idPais',
    as: 'pais'
});

// ZonaHoraria - Ubicacion (1:N)
ZonaHoraria.hasMany(Ubicacion, {
    foreignKey: 'idZonaHoraria',
    as: 'ubicaciones'
});
Ubicacion.belongsTo(ZonaHoraria, {
    foreignKey: 'idZonaHoraria',
    as: 'zonaHoraria'
});

// ZonaHoraria - UbicacionGuardada (1:N)
ZonaHoraria.hasMany(UbicacionGuardada, {
    foreignKey: 'idZonaHoraria',
    as: 'ubicacionesGuardadas'
});
UbicacionGuardada.belongsTo(ZonaHoraria, {
    foreignKey: 'idZonaHoraria',
    as: 'zonaHoraria'
});

// ParametroClima - PreferenciaUsuarioClima (1:N)
ParametroClima.hasMany(PreferenciaUsuarioClima, {
    foreignKey: 'idParametroClima',
    as: 'preferenciasUsuarios'
});
PreferenciaUsuarioClima.belongsTo(ParametroClima, {
    foreignKey: 'idParametroClima',
    as: 'parametro'
});

// ParametroClima - AlertaClima (1:N)
ParametroClima.hasMany(AlertaClima, {
    foreignKey: 'idParametroClima',
    as: 'alertas'
});
AlertaClima.belongsTo(ParametroClima, {
    foreignKey: 'idParametroClima',
    as: 'parametro'
});

// UbicacionGuardada - AlertaClima (1:N)
UbicacionGuardada.hasMany(AlertaClima, {
    foreignKey: 'idUbicacionGuardada',
    as: 'alertas'
});
AlertaClima.belongsTo(UbicacionGuardada, {
    foreignKey: 'idUbicacionGuardada',
    as: 'ubicacion'
});

// AlertaClima - HistorialNotificacion (1:N)
AlertaClima.hasMany(HistorialNotificacion, {
    foreignKey: 'idAlerta',
    as: 'notificaciones'
});
HistorialNotificacion.belongsTo(AlertaClima, {
    foreignKey: 'idAlerta',
    as: 'alerta'
});

module.exports = {
    sequelize,
    Pais,
    ZonaHoraria,
    Usuario,
    Ubicacion,
    UbicacionGuardada,
    ParametroClima,
    PreferenciaUsuarioClima,
    ConsultaClima,
    AlertaClima,
    HistorialNotificacion,
    SesionUsuario,
    PreferenciaUsuario
};