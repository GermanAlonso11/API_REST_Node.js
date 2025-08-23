const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();
const {validateRole, validateRoleUpdate} = require('../middlewares/validation')

//POST /roles - Crear un nuevo rol
router.post('/', validateRole, roleController.createRole);

//GET /roles - Obtener todos los roles
router.get('/', roleController.getAllRoles);

//GET /roles/:id - Obtener un rol por ID
router.get('/:id', roleController.getRoleById);

//PUT /roles:id - Actualizar un rol
router.put('/:id', validateRoleUpdate, roleController.updateRole)

//DELETE /roles/:id - Eliminar un rol
router.delete('/:id', roleController.deleteRole);

module.exports = router;

