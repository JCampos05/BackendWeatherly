-- ============================================
-- DATOS INICIALES - 24 ZONAS HORARIAS
-- ============================================

INSERT INTO zonas_horarias (idZonaHoraria, nombreZona, offsetUTC, nombreMostrar) VALUES
-- UTC y zonas negativas (oeste)
(1, 'Etc/GMT+12', -12.0, 'UTC-12:00 (Baker Island)'),
(2, 'Pacific/Midway', -11.0, 'UTC-11:00 (Samoa)'),
(3, 'Pacific/Honolulu', -10.0, 'UTC-10:00 (Hawaii)'),
(4, 'America/Anchorage', -9.0, 'UTC-09:00 (Alaska)'),
(5, 'America/Los_Angeles', -8.0, 'UTC-08:00 (PST - Pacífico)'),
(6, 'America/Denver', -7.0, 'UTC-07:00 (MST - Montaña)'),
(7, 'America/Chicago', -6.0, 'UTC-06:00 (CST - Central)'),
(8, 'America/New_York', -5.0, 'UTC-05:00 (EST - Este)'),
(9, 'America/Caracas', -4.0, 'UTC-04:00 (AST - Atlántico)'),
(10, 'America/Sao_Paulo', -3.0, 'UTC-03:00 (BRT - Brasil)'),
(11, 'Atlantic/South_Georgia', -2.0, 'UTC-02:00 (Georgia del Sur)'),
(12, 'Atlantic/Azores', -1.0, 'UTC-01:00 (Azores)'),
-- UTC
(13, 'UTC', 0.0, 'UTC±00:00 (Greenwich)'),
-- Zonas positivas (este)
(14, 'Europe/Paris', 1.0, 'UTC+01:00 (CET - Europa Central)'),
(15, 'Europe/Athens', 2.0, 'UTC+02:00 (EET - Europa Este)'),
(16, 'Europe/Moscow', 3.0, 'UTC+03:00 (MSK - Moscú)'),
(17, 'Asia/Dubai', 4.0, 'UTC+04:00 (GST - Golfo)'),
(18, 'Asia/Karachi', 5.0, 'UTC+05:00 (PKT - Pakistán)'),
(19, 'Asia/Dhaka', 6.0, 'UTC+06:00 (BST - Bangladesh)'),
(20, 'Asia/Bangkok', 7.0, 'UTC+07:00 (ICT - Indochina)'),
(21, 'Asia/Shanghai', 8.0, 'UTC+08:00 (CST - China)'),
(22, 'Asia/Tokyo', 9.0, 'UTC+09:00 (JST - Japón)'),
(23, 'Australia/Sydney', 10.0, 'UTC+10:00 (AEST - Australia Este)'),
(24, 'Pacific/Auckland', 12.0, 'UTC+12:00 (NZST - Nueva Zelanda)');




-- ============================================
-- DATOS INICIALES - 195 PAÍSES DEL MUNDO
-- ISO 3166-1 alpha-2 completo
-- ============================================

INSERT INTO paises (codigoPais, nombrePais, banderaUrl) VALUES
-- AMÉRICA DEL NORTE
('US', 'Estados Unidos', '🇺🇸'),
('CA', 'Canadá', '🇨🇦'),
('MX', 'México', '🇲🇽'),
('GT', 'Guatemala', '🇬🇹'),
('BZ', 'Belice', '🇧🇿'),
('SV', 'El Salvador', '🇸🇻'),
('HN', 'Honduras', '🇭🇳'),
('NI', 'Nicaragua', '🇳🇮'),
('CR', 'Costa Rica', '🇨🇷'),
('PA', 'Panamá', '🇵🇦'),

-- AMÉRICA DEL SUR
('CO', 'Colombia', '🇨🇴'),
('VE', 'Venezuela', '🇻🇪'),
('GY', 'Guyana', '🇬🇾'),
('SR', 'Surinam', '🇸🇷'),
('GF', 'Guayana Francesa', '🇬🇫'),
('BR', 'Brasil', '🇧🇷'),
('EC', 'Ecuador', '🇪🇨'),
('PE', 'Perú', '🇵🇪'),
('BO', 'Bolivia', '🇧🇴'),
('PY', 'Paraguay', '🇵🇾'),
('CL', 'Chile', '🇨🇱'),
('AR', 'Argentina', '🇦🇷'),
('UY', 'Uruguay', '🇺🇾'),

-- CARIBE
('CU', 'Cuba', '🇨🇺'),
('JM', 'Jamaica', '🇯🇲'),
('HT', 'Haití', '🇭🇹'),
('DO', 'República Dominicana', '🇩🇴'),
('PR', 'Puerto Rico', '🇵🇷'),
('BS', 'Bahamas', '🇧🇸'),
('TT', 'Trinidad y Tobago', '🇹🇹'),
('BB', 'Barbados', '🇧🇧'),
('LC', 'Santa Lucía', '🇱🇨'),
('GD', 'Granada', '🇬🇩'),
('VC', 'San Vicente y las Granadinas', '🇻🇨'),
('AG', 'Antigua y Barbuda', '🇦🇬'),
('DM', 'Dominica', '🇩🇲'),
('KN', 'San Cristóbal y Nieves', '🇰🇳'),

-- EUROPA OCCIDENTAL
('GB', 'Reino Unido', '🇬🇧'),
('IE', 'Irlanda', '🇮🇪'),
('FR', 'Francia', '🇫🇷'),
('ES', 'España', '🇪🇸'),
('PT', 'Portugal', '🇵🇹'),
('AD', 'Andorra', '🇦🇩'),
('MC', 'Mónaco', '🇲🇨'),
('BE', 'Bélgica', '🇧🇪'),
('NL', 'Países Bajos', '🇳🇱'),
('LU', 'Luxemburgo', '🇱🇺'),
('CH', 'Suiza', '🇨🇭'),
('LI', 'Liechtenstein', '🇱🇮'),
('DE', 'Alemania', '🇩🇪'),
('AT', 'Austria', '🇦🇹'),
('IT', 'Italia', '🇮🇹'),
('SM', 'San Marino', '🇸🇲'),
('VA', 'Vaticano', '🇻🇦'),
('MT', 'Malta', '🇲🇹'),

-- EUROPA NÓRDICA
('IS', 'Islandia', '🇮🇸'),
('NO', 'Noruega', '🇳🇴'),
('SE', 'Suecia', '🇸🇪'),
('FI', 'Finlandia', '🇫🇮'),
('DK', 'Dinamarca', '🇩🇰'),

-- EUROPA ORIENTAL
('PL', 'Polonia', '🇵🇱'),
('CZ', 'República Checa', '🇨🇿'),
('SK', 'Eslovaquia', '🇸🇰'),
('HU', 'Hungría', '🇭🇺'),
('RO', 'Rumania', '🇷🇴'),
('BG', 'Bulgaria', '🇧🇬'),
('MD', 'Moldavia', '🇲🇩'),
('UA', 'Ucrania', '🇺🇦'),
('BY', 'Bielorrusia', '🇧🇾'),
('RU', 'Rusia', '🇷🇺'),

-- EUROPA BALCÁNICA
('GR', 'Grecia', '🇬🇷'),
('AL', 'Albania', '🇦🇱'),
('MK', 'Macedonia del Norte', '🇲🇰'),
('RS', 'Serbia', '🇷🇸'),
('ME', 'Montenegro', '🇲🇪'),
('BA', 'Bosnia y Herzegovina', '🇧🇦'),
('HR', 'Croacia', '🇭🇷'),
('SI', 'Eslovenia', '🇸🇮'),
('XK', 'Kosovo', '🇽🇰'),

-- EUROPA BÁLTICA
('EE', 'Estonia', '🇪🇪'),
('LV', 'Letonia', '🇱🇻'),
('LT', 'Lituania', '🇱🇹'),

-- MEDIO ORIENTE
('TR', 'Turquía', '🇹🇷'),
('CY', 'Chipre', '🇨🇾'),
('SY', 'Siria', '🇸🇾'),
('LB', 'Líbano', '🇱🇧'),
('IL', 'Israel', '🇮🇱'),
('PS', 'Palestina', '🇵🇸'),
('JO', 'Jordania', '🇯🇴'),
('IQ', 'Irak', '🇮🇶'),
('KW', 'Kuwait', '🇰🇼'),
('SA', 'Arabia Saudita', '🇸🇦'),
('BH', 'Baréin', '🇧🇭'),
('QA', 'Catar', '🇶🇦'),
('AE', 'Emiratos Árabes Unidos', '🇦🇪'),
('OM', 'Omán', '🇴🇲'),
('YE', 'Yemen', '🇾🇪'),
('IR', 'Irán', '🇮🇷'),
('AM', 'Armenia', '🇦🇲'),
('AZ', 'Azerbaiyán', '🇦🇿'),
('GE', 'Georgia', '🇬🇪'),

-- ASIA CENTRAL
('KZ', 'Kazajistán', '🇰🇿'),
('UZ', 'Uzbekistán', '🇺🇿'),
('TM', 'Turkmenistán', '🇹🇲'),
('TJ', 'Tayikistán', '🇹🇯'),
('KG', 'Kirguistán', '🇰🇬'),
('AF', 'Afganistán', '🇦🇫'),
('PK', 'Pakistán', '🇵🇰'),

-- ASIA DEL SUR
('IN', 'India', '🇮🇳'),
('LK', 'Sri Lanka', '🇱🇰'),
('MV', 'Maldivas', '🇲🇻'),
('NP', 'Nepal', '🇳🇵'),
('BT', 'Bután', '🇧🇹'),
('BD', 'Bangladés', '🇧🇩'),
('MM', 'Myanmar', '🇲🇲'),

-- SUDESTE ASIÁTICO
('TH', 'Tailandia', '🇹🇭'),
('LA', 'Laos', '🇱🇦'),
('KH', 'Camboya', '🇰🇭'),
('VN', 'Vietnam', '🇻🇳'),
('MY', 'Malasia', '🇲🇾'),
('SG', 'Singapur', '🇸🇬'),
('BN', 'Brunéi', '🇧🇳'),
('ID', 'Indonesia', '🇮🇩'),
('TL', 'Timor Oriental', '🇹🇱'),
('PH', 'Filipinas', '🇵🇭'),

-- ASIA ORIENTAL
('CN', 'China', '🇨🇳'),
('MN', 'Mongolia', '🇲🇳'),
('KP', 'Corea del Norte', '🇰🇵'),
('KR', 'Corea del Sur', '🇰🇷'),
('JP', 'Japón', '🇯🇵'),
('TW', 'Taiwán', '🇹🇼'),
('HK', 'Hong Kong', '🇭🇰'),
('MO', 'Macao', '🇲🇴'),

-- ÁFRICA DEL NORTE
('EG', 'Egipto', '🇪🇬'),
('LY', 'Libia', '🇱🇾'),
('TN', 'Túnez', '🇹🇳'),
('DZ', 'Argelia', '🇩🇿'),
('MA', 'Marruecos', '🇲🇦'),
('EH', 'Sáhara Occidental', '🇪🇭'),
('MR', 'Mauritania', '🇲🇷'),
('SD', 'Sudán', '🇸🇩'),
('SS', 'Sudán del Sur', '🇸🇸'),

-- ÁFRICA OCCIDENTAL
('SN', 'Senegal', '🇸🇳'),
('GM', 'Gambia', '🇬🇲'),
('GW', 'Guinea-Bisáu', '🇬🇼'),
('GN', 'Guinea', '🇬🇳'),
('SL', 'Sierra Leona', '🇸🇱'),
('LR', 'Liberia', '🇱🇷'),
('CI', 'Costa de Marfil', '🇨🇮'),
('ML', 'Mali', '🇲🇱'),
('BF', 'Burkina Faso', '🇧🇫'),
('NE', 'Níger', '🇳🇪'),
('NG', 'Nigeria', '🇳🇬'),
('BJ', 'Benín', '🇧🇯'),
('TG', 'Togo', '🇹🇬'),
('GH', 'Ghana', '🇬🇭'),

-- ÁFRICA CENTRAL
('TD', 'Chad', '🇹🇩'),
('CF', 'República Centroafricana', '🇨🇫'),
('CM', 'Camerún', '🇨🇲'),
('GQ', 'Guinea Ecuatorial', '🇬🇶'),
('GA', 'Gabón', '🇬🇦'),
('CG', 'República del Congo', '🇨🇬'),
('CD', 'República Democrática del Congo', '🇨🇩'),
('AO', 'Angola', '🇦🇴'),

-- ÁFRICA ORIENTAL
('ER', 'Eritrea', '🇪🇷'),
('ET', 'Etiopía', '🇪🇹'),
('DJ', 'Yibuti', '🇩🇯'),
('SO', 'Somalia', '🇸🇴'),
('KE', 'Kenia', '🇰🇪'),
('UG', 'Uganda', '🇺🇬'),
('RW', 'Ruanda', '🇷🇼'),
('BI', 'Burundi', '🇧🇮'),
('TZ', 'Tanzania', '🇹🇿'),
('MZ', 'Mozambique', '🇲🇿'),
('MW', 'Malaui', '🇲🇼'),
('ZM', 'Zambia', '🇿🇲'),
('ZW', 'Zimbabue', '🇿🇼'),
('MG', 'Madagascar', '🇲🇬'),
('MU', 'Mauricio', '🇲🇺'),
('SC', 'Seychelles', '🇸🇨'),
('KM', 'Comoras', '🇰🇲'),

-- ÁFRICA AUSTRAL
('NA', 'Namibia', '🇳🇦'),
('BW', 'Botsuana', '🇧🇼'),
('ZA', 'Sudáfrica', '🇿🇦'),
('LS', 'Lesoto', '🇱🇸'),
('SZ', 'Esuatini', '🇸🇿'),

-- OCEANÍA
('AU', 'Australia', '🇦🇺'),
('NZ', 'Nueva Zelanda', '🇳🇿'),
('PG', 'Papúa Nueva Guinea', '🇵🇬'),
('FJ', 'Fiyi', '🇫🇯'),
('SB', 'Islas Salomón', '🇸🇧'),
('VU', 'Vanuatu', '🇻🇺'),
('NC', 'Nueva Caledonia', '🇳🇨'),
('PF', 'Polinesia Francesa', '🇵🇫'),
('WS', 'Samoa', '🇼🇸'),
('TO', 'Tonga', '🇹🇴'),
('KI', 'Kiribati', '🇰🇮'),
('TV', 'Tuvalu', '🇹🇻'),
('NR', 'Nauru', '🇳🇷'),
('PW', 'Palaos', '🇵🇼'),
('FM', 'Micronesia', '🇫🇲'),
('MH', 'Islas Marshall', '🇲🇭'),
('GU', 'Guam', '🇬🇺'),
('AS', 'Samoa Americana', '🇦🇸'),
('MP', 'Islas Marianas del Norte', '🇲🇵');


-- ============================================
-- DATOS INICIALES - PARAMETROS CLIMATICOS
-- Basado en los servicios implementados en Angular
-- ============================================

INSERT INTO parametrosClima (
    codigoParametro,
    nombreParametro,
    descripcion,
    categoriaParametro,
    iconoParametro,
    esParametroPremium
) VALUES
-- TEMPERATURA (5 parámetros)
(
    'temperature_current',
    'Temperatura Actual',
    'Temperatura del aire medida a 2 metros de altura',
    'temperatura',
    'ph-thermometer',
    FALSE
),
(
    'temperature_feels_like',
    'Sensación Térmica',
    'Temperatura percibida considerando humedad y viento',
    'temperatura',
    'ph-thermometer-hot',
    FALSE
),
(
    'temperature_min',
    'Temperatura Mínima',
    'Temperatura mínima del día',
    'temperatura',
    'ph-thermometer-cold',
    FALSE
),
(
    'temperature_max',
    'Temperatura Máxima',
    'Temperatura máxima del día',
    'temperatura',
    'ph-thermometer-hot',
    FALSE
),
(
    'temperature_dewpoint',
    'Punto de Rocío',
    'Temperatura a la que el aire se satura de humedad',
    'temperatura',
    'ph-drop-half',
    FALSE
),

-- PRECIPITACION (4 parámetros)
(
    'precipitation_current',
    'Precipitación Actual',
    'Cantidad de precipitación en la última hora',
    'precipitacion',
    'ph-cloud-rain',
    FALSE
),
(
    'precipitation_probability',
    'Probabilidad de Lluvia',
    'Probabilidad de precipitación en las próximas horas',
    'precipitacion',
    'ph-percent',
    FALSE
),
(
    'precipitation_type',
    'Tipo de Precipitación',
    'Indica si es lluvia, nieve, aguanieve o granizo',
    'precipitacion',
    'ph-cloud-snow',
    FALSE
),
(
    'precipitation_intensity',
    'Intensidad de Precipitación',
    'Clasifica la precipitación como ligera, moderada o fuerte',
    'precipitacion',
    'ph-drops',
    FALSE
),

-- VIENTO (4 parámetros)
(
    'wind_speed',
    'Velocidad del Viento',
    'Velocidad del viento medida a 10 metros de altura',
    'viento',
    'ph-wind',
    FALSE
),
(
    'wind_direction',
    'Dirección del Viento',
    'Dirección de la que proviene el viento en grados',
    'viento',
    'ph-compass',
    FALSE
),
(
    'wind_gusts',
    'Ráfagas de Viento',
    'Velocidad máxima de las ráfagas de viento',
    'viento',
    'ph-tornado',
    FALSE
),
(
    'wind_cardinal',
    'Punto Cardinal',
    'Dirección del viento en puntos cardinales (N, S, E, O)',
    'viento',
    'ph-navigation-arrow',
    FALSE
),

-- HUMEDAD (2 parámetros)
(
    'humidity_relative',
    'Humedad Relativa',
    'Porcentaje de humedad en el aire',
    'humedad',
    'ph-drop',
    FALSE
),
(
    'humidity_absolute',
    'Humedad Absoluta',
    'Cantidad de vapor de agua en gramos por metro cúbico',
    'humedad',
    'ph-drop-half-bottom',
    FALSE
),

-- PRESION (3 parámetros)
(
    'pressure_surface',
    'Presión Atmosférica',
    'Presión del aire a nivel de superficie',
    'presion',
    'ph-gauge',
    FALSE
),
(
    'pressure_sea_level',
    'Presión al Nivel del Mar',
    'Presión atmosférica ajustada al nivel del mar',
    'presion',
    'ph-waves',
    FALSE
),
(
    'pressure_trend',
    'Tendencia de Presión',
    'Indica si la presión está subiendo, bajando o estable',
    'presion',
    'ph-chart-line-up',
    FALSE
),

-- RADIACION (3 parámetros)
(
    'radiation_solar',
    'Radiación Solar',
    'Radiación solar en watts por metro cuadrado',
    'radiacion',
    'ph-sun-horizon',
    FALSE
),
(
    'radiation_uv',
    'Índice UV',
    'Índice de radiación ultravioleta',
    'radiacion',
    'ph-sun',
    FALSE
),
(
    'radiation_uv_index',
    'Categoría UV',
    'Clasificación del índice UV (bajo, moderado, alto, muy alto, extremo)',
    'radiacion',
    'ph-sun-dim',
    FALSE
),

-- NUBOSIDAD (4 parámetros)
(
    'cloud_cover_total',
    'Nubosidad Total',
    'Porcentaje de cobertura nubosa total',
    'nubosidad',
    'ph-cloud',
    FALSE
),
(
    'cloud_cover_low',
    'Nubes Bajas',
    'Porcentaje de nubes a baja altitud',
    'nubosidad',
    'ph-cloud-fog',
    FALSE
),
(
    'cloud_cover_mid',
    'Nubes Medias',
    'Porcentaje de nubes a altitud media',
    'nubosidad',
    'ph-cloud',
    FALSE
),
(
    'cloud_cover_high',
    'Nubes Altas',
    'Porcentaje de nubes a gran altitud',
    'nubosidad',
    'ph-clouds',
    FALSE
),

-- OTROS (6 parámetros)
(
    'visibility',
    'Visibilidad',
    'Distancia máxima a la que se pueden ver objetos claramente',
    'otros',
    'ph-eye',
    FALSE
),
(
    'astronomy_sunrise',
    'Amanecer',
    'Hora del amanecer',
    'otros',
    'ph-sunrise',
    FALSE
),
(
    'astronomy_sunset',
    'Atardecer',
    'Hora del atardecer',
    'otros',
    'ph-sunset',
    FALSE
),
(
    'astronomy_moonrise',
    'Salida de Luna',
    'Hora de salida de la luna',
    'otros',
    'ph-moon',
    FALSE
),
(
    'astronomy_moonset',
    'Puesta de Luna',
    'Hora de puesta de la luna',
    'otros',
    'ph-moon',
    FALSE
),
(
    'astronomy_moon_phase',
    'Fase Lunar',
    'Fase actual de la luna (nueva, creciente, llena, menguante)',
    'otros',
    'ph-moon-stars',
    FALSE
);


-- ============================================
-- DATOS INICIALES - CATEGORÍAS
-- ============================================
INSERT INTO categoriasParametros (
    codigoCategoria,
    nombreCategoria,
    descripcionCategoria,
    iconoCategoria,
    colorCategoria,
    ordenVisualizacion
) VALUES
(
    'temperatura',
    'Temperatura',
    'Mediciones de temperatura del aire, sensación térmica y punto de rocío',
    'ph-thermometer',
    '#ef4444',
    1
),
(
    'precipitacion',
    'Precipitación',
    'Datos sobre lluvia, nieve, granizo y probabilidad de precipitación',
    'ph-cloud-rain',
    '#3b82f6',
    2
),
(
    'viento',
    'Viento',
    'Velocidad, dirección y ráfagas del viento',
    'ph-wind',
    '#06b6d4',
    3
),
(
    'humedad',
    'Humedad',
    'Humedad relativa y absoluta del aire',
    'ph-drop',
    '#0ea5e9',
    4
),
(
    'presion',
    'Presión',
    'Presión atmosférica a nivel de superficie y del mar',
    'ph-gauge',
    '#8b5cf6',
    5
),
(
    'radiacion',
    'Radiación',
    'Radiación solar e índice UV',
    'ph-sun',
    '#f59e0b',
    6
),
(
    'nubosidad',
    'Nubosidad',
    'Cobertura de nubes en diferentes altitudes',
    'ph-cloud',
    '#94a3b8',
    7
),
(
    'visibilidad',
    'Visibilidad',
    'Distancia máxima de visibilidad atmosférica',
    'ph-eye',
    '#64748b',
    8
),
(
    'astronomia',
    'Astronomía',
    'Datos de salida/puesta de sol y luna, fases lunares',
    'ph-moon-stars',
    '#4f46e5',
    9
),
(
    'otros',
    'Otros',
    'Parámetros adicionales y datos generales',
    'ph-dots-three',
    '#6b7280',
    10
);
