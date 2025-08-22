const express = require('express');
const roleController = require('../controllers/roleController');
const router = express.Router();
const {validateRole, validateRoleUpdate} = require('../middlewares/validation')

//POST /roles - Crear un nuevo rol
router.post('/')

