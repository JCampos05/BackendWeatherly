const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

router.get('/', userController.getUser);
router.put('/', userController.updateUser);
router.put('/change-password', userController.changePassword);
router.delete('/', userController.deleteUser);
router.put('/status', userController.updateAccountStatus);

module.exports = router;