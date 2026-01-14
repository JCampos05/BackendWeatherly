const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');
const db = require('./models');
const routes = require('./routes/index.routes');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            /^http:\/\/localhost:\d+$/,
            /^http:\/\/127\.0\.0\.1:\d+$/,
            /^https:\/\/.*\.vercel\.app$/, 
        ].filter(Boolean); 

        if (!origin) {
            return callback(null, true);
        }

        const isAllowed = allowedOrigins.some(pattern => {
            if (pattern instanceof RegExp) {
                return pattern.test(origin);
            }
            return pattern === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn(`CORS bloqueado para origen: ${origin}`);
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Cache-Control'],
    maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Weatherly API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Rutas de la aplicación
app.use('/api', routes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path 
    });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Iniciar servidor
const startServer = async () => {
    try {
        await testConnection();
        
        // Sincronizar modelos (solo en desarrollo)
        if (process.env.NODE_ENV === 'development') {
            await db.sequelize.sync({ alter: false });
            console.log('Modelos sincronizados con la base de datos');
        }
        
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en puerto ${PORT}`);
            console.log(`📝 Ambiente: ${process.env.NODE_ENV}`);
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log(`💾 Base de datos: ${process.env.DB_NAME}`);
            console.log(`API Health: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();