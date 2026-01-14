const userService = require('../services/user.service');

/**
 * Obtener información del usuario autenticado
 */
exports.getUser = async (req, res) => {
    try {
        const usuario = await userService.getUserById(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: 'Usuario obtenido',
            data: usuario
        });

    } catch (error) {
        console.error('Error en getUser controller:', error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Actualizar información del usuario
 */
exports.updateUser = async (req, res) => {
    try {
        const { nombre, apellidos, nombreUsuario } = req.body;

        const usuario = await userService.updateUser(req.usuario.idUsuario, {
            nombre,
            apellidos,
            nombreUsuario
        });

        res.status(200).json({
            success: true,
            message: 'Usuario actualizado',
            data: usuario
        });

    } catch (error) {
        console.error('Error en updateUser controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Cambiar contraseña
 */
exports.changePassword = async (req, res) => {
    try {
        const { passwordActual, nuevaPassword } = req.body;

        if (!passwordActual || !nuevaPassword) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña actual y nueva contraseña son requeridas'
            });
        }

        if (nuevaPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'La nueva contraseña debe tener al menos 6 caracteres'
            });
        }

        const result = await userService.changePassword(
            req.usuario.idUsuario,
            passwordActual,
            nuevaPassword
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en changePassword controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Eliminar cuenta
 */
exports.deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.usuario.idUsuario);

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Error en deleteUser controller:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Cambiar estado de cuenta
 */
exports.updateAccountStatus = async (req, res) => {
    try {
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({
                success: false,
                message: 'Estado es requerido'
            });
        }

        const result = await userService.updateAccountStatus(
            req.usuario.idUsuario,
            estado
        );

        res.status(200).json({
            success: true,
            message: result.message,
            data: result
        });

    } catch (error) {
        console.error('Error en updateAccountStatus controller:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};