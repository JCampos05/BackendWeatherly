-- ============================================
-- TABLA: paises
-- Catálogo de países con código ISO estándar
-- ============================================
CREATE TABLE paises (
    idPais SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codigoPais CHAR(2) NOT NULL UNIQUE COMMENT 'ISO 3166-1 alpha-2 (MX, US, ES, etc.)',
    nombrePais VARCHAR(100) NOT NULL,
    banderaUrl VARCHAR(255) COMMENT 'URL de la bandera o código emoji',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_codigoPais (codigoPais)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: zonasHorarias
-- Catálogo de zonas horarias (usando tu estructura)
-- ============================================
CREATE TABLE zonasHorarias (
    idZonaHoraria TINYINT UNSIGNED PRIMARY KEY,
    nombreZona VARCHAR(50) NOT NULL UNIQUE COMMENT 'Ej: America/Mexico_City',
    offsetUTC DECIMAL(3,1) NOT NULL COMMENT 'Offset en horas desde UTC',
    nombreMostrar VARCHAR(100) NOT NULL COMMENT 'Nombre para mostrar en UI',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nombreZona (nombreZona)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: usuarios
-- Gestión de autenticación y perfil de usuario
-- ============================================
CREATE TABLE usuarios (
    idUsuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt',
    tokenRecuperacion VARCHAR(255),
    expiracionToken DATETIME,
    estadoCuenta ENUM('activo', 'inactivo', 'suspendido') DEFAULT 'activo',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_correo (correo),
    INDEX idx_nombreUsuario (nombreUsuario)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: ubicaciones
-- Ubicación principal del usuario
-- ============================================
CREATE TABLE ubicaciones (
    idUbicacion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL UNIQUE COMMENT 'Un usuario = una ubicación principal',
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    altitud SMALLINT COMMENT 'Metros sobre el nivel del mar',
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    idPais SMALLINT UNSIGNED,
    codigoPostal VARCHAR(20),
    idZonaHoraria TINYINT UNSIGNED,
    direccionCompleta TEXT,
    esUbicacionManual BOOLEAN DEFAULT FALSE COMMENT 'Manual o por geolocalización',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idPais) REFERENCES paises(idPais) ON DELETE SET NULL,
    FOREIGN KEY (idZonaHoraria) REFERENCES zonasHorarias(idZonaHoraria) ON DELETE SET NULL,
    INDEX idx_usuario (idUsuario),
    INDEX idx_coordenadas (latitud, longitud)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: ubicacionesGuardadas
-- Ubicaciones favoritas del usuario (múltiples)
-- ============================================
CREATE TABLE ubicacionesGuardadas (
    idUbicacionGuardada INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL,
    nombrePersonalizado VARCHAR(100) COMMENT 'Ej: Casa, Trabajo, Casa de mamá',
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    altitud SMALLINT,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    idPais SMALLINT UNSIGNED,
    codigoPostal VARCHAR(20),
    idZonaHoraria TINYINT UNSIGNED,
    esUbicacionPrincipal BOOLEAN DEFAULT FALSE COMMENT 'Ubicación por defecto',
    ordenVisualizacion TINYINT UNSIGNED DEFAULT 0 COMMENT 'Orden en el frontend',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idPais) REFERENCES paises(idPais) ON DELETE SET NULL,
    FOREIGN KEY (idZonaHoraria) REFERENCES zonasHorarias(idZonaHoraria) ON DELETE SET NULL,
    INDEX idx_usuario (idUsuario),
    INDEX idx_coordenadas (latitud, longitud),
    UNIQUE KEY uk_usuario_nombre (idUsuario, nombrePersonalizado)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: parametrosClima
-- Catálogo de parámetros meteorológicos disponibles
-- JUSTIFICACIÓN: Define todos los parámetros que el sistema puede mostrar.
-- Permite agregar nuevos parámetros sin modificar código.
-- ============================================
CREATE TABLE parametrosClima (
    idParametroClima SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codigoParametro VARCHAR(50) NOT NULL UNIQUE COMMENT 'Ej: temperature_2m, precipitation',
    nombreParametro VARCHAR(100) NOT NULL COMMENT 'Nombre legible: Temperatura',
    descripcion TEXT,
    categoriaParametro ENUM('temperatura', 'precipitacion', 'viento', 'humedad', 'presion', 'radiacion', 'nubosidad', 'otros') DEFAULT 'otros',
    iconoParametro VARCHAR(50) COMMENT 'Nombre del icono o clase CSS',
    esParametroPremium BOOLEAN DEFAULT FALSE COMMENT 'Requiere suscripción',
    esObligatorio BOOLEAN DEFAULT FALSE,
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_codigo (codigoParametro),
    INDEX idx_categoria (categoriaParametro)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: preferenciasUsuarioClima
-- Parámetros personalizados que cada usuario quiere ver
-- NOTA: Los parámetros default se crean en backend al registrar usuario
-- ============================================
CREATE TABLE preferenciasUsuarioClima (
    idPreferenciaClima INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL,
    idParametroClima SMALLINT UNSIGNED NOT NULL,
    estaActivo BOOLEAN DEFAULT TRUE COMMENT 'Si el usuario quiere ver este parámetro',
    ordenVisualizacion TINYINT UNSIGNED DEFAULT 0 COMMENT 'Orden en el dashboard',
    configuracionAdicional JSON COMMENT 'Ej: {"umbralAlerta": 35, "colorCustom": "#FF5733"}',
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idParametroClima) REFERENCES parametrosClima(idParametroClima) ON DELETE CASCADE,
    UNIQUE KEY uk_usuario_parametro (idUsuario, idParametroClima),
    INDEX idx_usuario (idUsuario),
    INDEX idx_activo (estaActivo)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: consultasClima
-- Cache de consultas realizadas (CON LÍMITE)
-- JUSTIFICACIÓN: Evita llamadas repetidas a APIs externas.
-- Mejora rendimiento y reduce costos.
-- LÍMITE: Implementar TTL y limpieza automática con evento MySQL
-- ============================================
CREATE TABLE consultasClima (
    idConsulta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    parametrosConsultados JSON COMMENT 'Array de parámetros solicitados',
    respuestaApi JSON COMMENT 'Respuesta de la API',
    fechaConsulta DATETIME DEFAULT CURRENT_TIMESTAMP,
    tiempoRespuesta SMALLINT UNSIGNED COMMENT 'Milisegundos',
    fechaExpiracion DATETIME NOT NULL COMMENT 'TTL para cache - Ej: 15 min para datos actuales',
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE SET NULL,
    INDEX idx_coordenadas_fecha (latitud, longitud, fechaConsulta),
    INDEX idx_expiracion (fechaExpiracion),
    INDEX idx_usuario_fecha (idUsuario, fechaConsulta)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: alertasClima
-- Sistema de alertas personalizadas del usuario mediante SSE
-- JUSTIFICACIÓN: Permite notificar automáticamente condiciones específicas
-- ============================================
CREATE TABLE alertasClima (
    idAlerta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL,
    idUbicacionGuardada INT UNSIGNED COMMENT 'NULL = ubicación principal',
    idParametroClima SMALLINT UNSIGNED NOT NULL,
    tipoAlerta ENUM('umbral_superior', 'umbral_inferior', 'cambio_brusco', 'pronostico') DEFAULT 'umbral_superior',
    valorUmbral DECIMAL(10, 2),
    condicion VARCHAR(50) COMMENT 'mayor_que, menor_que, igual_a, entre',
    mensajePersonalizado VARCHAR(255) COMMENT 'Mensaje custom del usuario',
    estaActiva BOOLEAN DEFAULT TRUE,
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idUbicacionGuardada) REFERENCES ubicacionesGuardadas(idUbicacionGuardada) ON DELETE CASCADE,
    FOREIGN KEY (idParametroClima) REFERENCES parametrosClima(idParametroClima) ON DELETE CASCADE,
    INDEX idx_usuario (idUsuario),
    INDEX idx_activa (estaActiva)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: historialNotificaciones
-- Registro de notificaciones enviadas
-- JUSTIFICACIÓN: Evita spam de notificaciones y permite auditoría
-- ============================================
CREATE TABLE historialNotificaciones (
    idNotificacion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL,
    idAlerta INT UNSIGNED NOT NULL,
    tipoNotificacion ENUM('push', 'in_app') DEFAULT 'push',
    tituloNotificacion VARCHAR(150),
    mensajeNotificacion TEXT,
    datosAdicionales JSON COMMENT 'Datos del clima que activaron la alerta',
    fueLeida BOOLEAN DEFAULT FALSE,
    fechaEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaLectura DATETIME,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idAlerta) REFERENCES alertasClima(idAlerta) ON DELETE CASCADE,
    INDEX idx_usuario_fecha (idUsuario, fechaEnvio),
    INDEX idx_leida (fueLeida)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: sesionesUsuario
-- Manejo de JWT y sesiones activas
-- ============================================
CREATE TABLE sesionesUsuario (
    idSesion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL,
    tokenJWT TEXT NOT NULL,
    refreshToken VARCHAR(255),
    ipAddress VARCHAR(45),
    userAgent VARCHAR(255),
    dispositivoNombre VARCHAR(100) COMMENT 'Ej: iPhone 14, Chrome Windows',
    fechaInicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaExpiracion DATETIME NOT NULL,
    estaActiva BOOLEAN DEFAULT TRUE,
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_usuario (idUsuario),
    INDEX idx_activa (estaActiva),
    INDEX idx_expiracion (fechaExpiracion)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: preferenciasUsuario
-- Configuraciones personales de cada usuario
-- ENFOQUE: Personalización de experiencia UX
-- ============================================
CREATE TABLE preferenciasUsuario (
    idPreferencia INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT UNSIGNED NOT NULL UNIQUE,
    
    -- NOTIFICACIONES
    recibirNotificaciones BOOLEAN DEFAULT TRUE COMMENT 'Activar/desactivar todas las notificaciones',
    frecuenciaNotificaciones ENUM('todas', 'importante', 'urgente', 'ninguna') DEFAULT 'todas' 
        COMMENT 'Nivel de notificaciones a recibir',
    horarioNoMolestar JSON DEFAULT NULL 
        COMMENT '{"inicio": "22:00", "fin": "08:00"} - No enviar notificaciones en este rango',
    
    -- PRONÓSTICO
    diasPronostico TINYINT UNSIGNED DEFAULT 7 
        COMMENT 'Días de pronóstico a mostrar (1-14)',
    horasPronostico TINYINT UNSIGNED DEFAULT 24 
        COMMENT 'Horas de pronóstico horario (1-48)',
    -- SIEMPRE actualizar el pronostico
    intervaloActualizacion SMALLINT UNSIGNED DEFAULT 30 
        COMMENT 'Minutos entre actualizaciones automáticas',
    
    -- UNIDADES DE MEDIDA
    unidadTemperatura ENUM('celsius', 'fahrenheit', 'kelvin') DEFAULT 'celsius',
    unidadVelocidad ENUM('kmh', 'mph', 'ms', 'knots') DEFAULT 'kmh' 
        COMMENT 'km/h, millas/h, m/s, nudos',
    unidadPresion ENUM('hpa', 'mmhg', 'inhg', 'mbar') DEFAULT 'hpa' 
        COMMENT 'Hectopascales, mmHg, inHg, milibar',
    unidadPrecipitacion ENUM('mm', 'inch') DEFAULT 'mm',
    unidadDistancia ENUM('km', 'mi') DEFAULT 'km' 
        COMMENT 'Kilómetros o millas',
    
    -- INTERFAZ Y VISUALIZACIÓN
    temaInterfaz ENUM('claro', 'oscuro', 'auto') DEFAULT 'auto' 
        COMMENT 'Auto sigue configuración del sistema',
    idiomaPreferido CHAR(2) DEFAULT 'es' 
        COMMENT 'Código ISO 639-1 (es, en, fr, etc.)',
    formatoHora ENUM('12h', '24h') DEFAULT '24h',
    formatoFecha ENUM('DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD') DEFAULT 'DD/MM/YYYY',
    
    -- DATOS Y CACHÉ
    usarDatosMoviles BOOLEAN DEFAULT TRUE 
        COMMENT 'Permitir actualizaciones con datos móviles',
    
    fechaCreado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaActualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_usuario (idUsuario)
) ENGINE=InnoDB;

-- ============================================
-- EVENTO: Limpieza automática de cache expirado
-- Se ejecuta cada hora para eliminar consultas vencidas
-- ============================================
DELIMITER //
CREATE EVENT IF NOT EXISTS limpiarCacheClima
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
    DELETE FROM consultasClima 
    WHERE fechaExpiracion < NOW();
END//
DELIMITER ;

-- ============================================
-- EVENTO: Limpieza de sesiones expiradas
-- Se ejecuta diariamente
-- ============================================
DELIMITER //
CREATE EVENT IF NOT EXISTS limpiarSesionesExpiradas
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    DELETE FROM sesionesUsuario 
    WHERE fechaExpiracion < NOW() OR 
          (estaActiva = FALSE AND fechaActualizado < DATE_SUB(NOW(), INTERVAL 30 DAY));
END//
DELIMITER ;
