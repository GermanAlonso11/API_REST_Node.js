const express = require('express');
const userController = require('../controllers/userController');
//Exportar middlewares
const {validateUserName} = require('../middlewares/validation');

const router = express.Router();

//POST /usuarios - Crear un nuevo usuario
router.post('/', validateUserName, userController.createUser);

//GET /usuarios - Obtener todos los usuarios
router.get('/', userController.getAllUsers);

//GET /usuarios/:id - Obtener un usuario por ID
router.get('/:id', userController.getUserById);

//PUT /usuarios/:id - Actualizar un usuario por ID
router.put('/:id', validateUserName, userController.updateUserById);

//DELETE /usuarios/:id - Eliminar un usuario por ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;
