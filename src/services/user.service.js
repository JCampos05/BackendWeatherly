const bcrypt = require('bcrypt');
const { 
    Usuario, 
    Ubicacion, 
    UbicacionGuardada, 
    PreferenciaUsuario,
    Pais,
    ZonaHoraria 
} = require('../models');

class UserService {
    /**
     * Obtener información del usuario con sus relaciones
     */
    async getUserById(idUsuario) {
        try {
            const usuario = await Usuario.findByPk(idUsuario, {
                attributes: { exclude: ['password', 'tokenRecuperacion', 'expiracionToken'] },
                include: [
                    {
                        model: Ubicacion,
                        as: 'ubicacion',
                        include: [
                            { model: Pais, as: 'pais' },
                            { model: ZonaHoraria, as: 'zonaHoraria' }
                        ]
                    },
                    {
                        model: PreferenciaUsuario,
                        as: 'preferencias'
                    },
                    {
                        model: UbicacionGuardada,
                        as: 'ubicacionesGuardadas',
                        include: [
                            { model: Pais, as: 'pais' },
                            { model: ZonaHoraria, as: 'zonaHoraria' }
                        ]
                    }
                ]
            });

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            return usuario;

        } catch (error) {
            console.error('Error en getUserById:', error.message);
            throw error;
        }
    }

    /**
     * Actualizar información del usuario
     */
    async updateUser(idUsuario, updateData) {
        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Campos permitidos para actualizar
            const camposPermitidos = ['nombre', 'apellidos', 'nombreUsuario'];
            const datosActualizar = {};

            camposPermitidos.forEach(campo => {
                if (updateData[campo] !== undefined) {
                    datosActualizar[campo] = updateData[campo];
                }
            });

            // Verificar si el nombreUsuario ya existe
            if (datosActualizar.nombreUsuario && datosActualizar.nombreUsuario !== usuario.nombreUsuario) {
                const existeNombre = await Usuario.findOne({
                    where: { nombreUsuario: datosActualizar.nombreUsuario }
                });

                if (existeNombre) {
                    throw new Error('El nombre de usuario ya está en uso');
                }
            }

            await usuario.update(datosActualizar);

            console.log(`Usuario actualizado: ${usuario.idUsuario}`);

            return {
                idUsuario: usuario.idUsuario,
                nombreUsuario: usuario.nombreUsuario,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo
            };

        } catch (error) {
            console.error('Error en updateUser:', error.message);
            throw error;
        }
    }

    /**
     * Cambiar contraseña
     */
    async changePassword(idUsuario, passwordActual, nuevaPassword) {
        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Verificar contraseña actual
            const passwordValido = await bcrypt.compare(passwordActual, usuario.password);
            if (!passwordValido) {
                throw new Error('Contraseña actual incorrecta');
            }

            // Hash nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

            await usuario.update({ password: hashedPassword });

            console.log(`Contraseña cambiada para usuario: ${usuario.idUsuario}`);

            return { message: 'Contraseña actualizada correctamente' };

        } catch (error) {
            console.error('Error en changePassword:', error.message);
            throw error;
        }
    }

    /**
     * Eliminar cuenta de usuario
     */
    async deleteUser(idUsuario) {
        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            await usuario.destroy();

            console.log(`Usuario eliminado: ${idUsuario}`);

            return { message: 'Cuenta eliminada correctamente' };

        } catch (error) {
            console.error('Error en deleteUser:', error.message);
            throw error;
        }
    }

    /**
     * Cambiar estado de cuenta
     */
    async updateAccountStatus(idUsuario, nuevoEstado) {
        try {
            const usuario = await Usuario.findByPk(idUsuario);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            const estadosValidos = ['activo', 'inactivo', 'suspendido'];
            if (!estadosValidos.includes(nuevoEstado)) {
                throw new Error('Estado inválido');
            }

            await usuario.update({ estadoCuenta: nuevoEstado });

            console.log(`Estado de cuenta actualizado: ${idUsuario} -> ${nuevoEstado}`);

            return { 
                message: 'Estado actualizado correctamente',
                estadoCuenta: nuevoEstado
            };

        } catch (error) {
            console.error('Error en updateAccountStatus:', error.message);
            throw error;
        }
    }
}

module.exports = new UserService();