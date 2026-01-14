const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Usuario, SesionUsuario, PreferenciaUsuario, Ubicacion } = require('../models');

class AuthService {
    /**
     * Registrar nuevo usuario
     */
    async register(userData) {
        try {
            const { nombreUsuario, nombre, apellidos, correo, password } = userData;

            // Verificar si el usuario ya existe
            const existeUsuario = await Usuario.findOne({
                where: { correo }
            });

            if (existeUsuario) {
                throw new Error('El correo ya está registrado');
            }

            const existeNombreUsuario = await Usuario.findOne({
                where: { nombreUsuario }
            });

            if (existeNombreUsuario) {
                throw new Error('El nombre de usuario ya está en uso');
            }

            // Hash del password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario
            const usuario = await Usuario.create({
                nombreUsuario,
                nombre,
                apellidos,
                correo,
                password: hashedPassword,
                estadoCuenta: 'activo'
            });

            // Crear preferencias por defecto
            await PreferenciaUsuario.create({
                idUsuario: usuario.idUsuario
            });

            console.log(`Usuario registrado: ${usuario.nombreUsuario} (ID: ${usuario.idUsuario})`);

            return {
                idUsuario: usuario.idUsuario,
                nombreUsuario: usuario.nombreUsuario,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo
            };

        } catch (error) {
            console.error('Error en register:', error.message);
            throw error;
        }
    }

    /**
     * Login de usuario
     */
    async login(credentials, deviceInfo) {
        try {
            const { correo, password } = credentials;

            // Buscar usuario
            const usuario = await Usuario.findOne({
                where: { correo }
            });

            if (!usuario) {
                throw new Error('Credenciales inválidas');
            }

            // Verificar estado de cuenta
            if (usuario.estadoCuenta !== 'activo') {
                throw new Error(`Cuenta ${usuario.estadoCuenta}`);
            }

            // Verificar password
            const passwordValido = await bcrypt.compare(password, usuario.password);
            if (!passwordValido) {
                throw new Error('Credenciales inválidas');
            }

            // Generar tokens
            const token = this.generateToken(usuario);
            const refreshToken = this.generateRefreshToken();

            // Calcular fecha de expiración (7 días)
            const fechaExpiracion = new Date();
            fechaExpiracion.setDate(fechaExpiracion.getDate() + 7);

            // Crear sesión
            await SesionUsuario.create({
                idUsuario: usuario.idUsuario,
                tokenJWT: token,
                refreshToken: refreshToken,
                ipAddress: deviceInfo.ip,
                userAgent: deviceInfo.userAgent,
                dispositivoNombre: deviceInfo.deviceName,
                fechaExpiracion: fechaExpiracion,
                estaActiva: true
            });

            console.log(`Login exitoso: ${usuario.correo}`);

            return {
                usuario: {
                    idUsuario: usuario.idUsuario,
                    nombreUsuario: usuario.nombreUsuario,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    correo: usuario.correo
                },
                token,
                refreshToken,
                expiresIn: '7d'
            };

        } catch (error) {
            console.error('Error en login:', error.message);
            throw error;
        }
    }

    /**
     * Logout de usuario
     */
    async logout(token) {
        try {
            await SesionUsuario.update(
                { estaActiva: false },
                { where: { tokenJWT: token } }
            );

            console.log('Logout exitoso');
            return { message: 'Sesión cerrada correctamente' };

        } catch (error) {
            console.error('Error en logout:', error.message);
            throw error;
        }
    }

    /**
     * Refrescar token
     */
    async refreshToken(refreshToken) {
        try {
            const sesion = await SesionUsuario.findOne({
                where: {
                    refreshToken,
                    estaActiva: true
                },
                include: [{
                    model: Usuario,
                    as: 'usuario'
                }]
            });

            if (!sesion) {
                throw new Error('Refresh token inválido');
            }

            if (new Date() > sesion.fechaExpiracion) {
                await sesion.update({ estaActiva: false });
                throw new Error('Refresh token expirado');
            }

            // Generar nuevo token
            const nuevoToken = this.generateToken(sesion.usuario);

            // Actualizar sesión
            await sesion.update({
                tokenJWT: nuevoToken
            });

            return {
                token: nuevoToken,
                expiresIn: '7d'
            };

        } catch (error) {
            console.error('Error en refreshToken:', error.message);
            throw error;
        }
    }

    /**
     * Solicitar recuperación de contraseña
     */
    async requestPasswordReset(correo) {
        try {
            const usuario = await Usuario.findOne({ where: { correo } });

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Generar token de recuperación
            const token = crypto.randomBytes(32).toString('hex');
            const expiracion = new Date();
            expiracion.setHours(expiracion.getHours() + 1); // 1 hora

            await usuario.update({
                tokenRecuperacion: token,
                expiracionToken: expiracion
            });

            console.log(`Token de recuperación generado para: ${correo}`);

            return {
                message: 'Token de recuperación generado',
                token, // En producción, enviar por email
                expiracion
            };

        } catch (error) {
            console.error('Error en requestPasswordReset:', error.message);
            throw error;
        }
    }

    /**
     * Restablecer contraseña
     */
    async resetPassword(token, nuevaPassword) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    tokenRecuperacion: token
                }
            });

            if (!usuario) {
                throw new Error('Token inválido');
            }

            if (new Date() > usuario.expiracionToken) {
                throw new Error('Token expirado');
            }

            // Hash nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

            await usuario.update({
                password: hashedPassword,
                tokenRecuperacion: null,
                expiracionToken: null
            });

            // Cerrar todas las sesiones activas
            await SesionUsuario.update(
                { estaActiva: false },
                { where: { idUsuario: usuario.idUsuario } }
            );

            console.log(`Contraseña restablecida para: ${usuario.correo}`);

            return { message: 'Contraseña restablecida correctamente' };

        } catch (error) {
            console.error('Error en resetPassword:', error.message);
            throw error;
        }
    }

    /**
     * Generar JWT token
     */
    generateToken(usuario) {
        return jwt.sign(
            {
                idUsuario: usuario.idUsuario,
                correo: usuario.correo,
                nombreUsuario: usuario.nombreUsuario
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
    }

    /**
     * Generar refresh token
     */
    generateRefreshToken() {
        return crypto.randomBytes(64).toString('hex');
    }
}

module.exports = new AuthService();