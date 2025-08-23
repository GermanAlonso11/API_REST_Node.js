//Importar modelo
const usr = require('../models/User.js');
const RoleService = require('./roleService.js');
const { Op } = require('sequelize');

const roleService = new RoleService();

//Validar email unico con manejo de errores
const validateUniqueEmail = async (email, excludeId = null) => {
    try {
        const whereCondition = { email };
        
        // Si se proporciona un ID a excluir, agregarlo a la condición
        if (excludeId) {
            whereCondition.id = { [Op.ne]: excludeId };
        }
        
        const user = await usr.findOne({ where: whereCondition });
        if (user) {
            throw new Error('El email ya está en uso');
        }
    } catch (error) {
        if (error.message === 'El email ya está en uso') {
            throw error;
        }
        throw new Error('Error al validar el email');
    }
};

//Validar rol valido
const validateValidRole = async (roleId) => {
    try {
        const role = await roleService.getRoleById(roleId);
        if (!role) {
            throw new Error('El rol no es válido');
        }
        return true;
    } catch (error) {
        if (error.message.includes('Role not found')) {
            throw new Error(`El rol con ID ${roleId} no existe`);
        }
        throw new Error(`Error al validar el rol: ${error.message}`);
    }
};

//Validar cantidad de caracteres para nombre (entre 2 y 50 caracteres)
const validateNameLength = (name) => {
    if (name.length < 2 || name.length > 50) {
        throw new Error('El nombre debe tener entre 2 y 50 caracteres');
    }
};

//SECCION DE CRUD

//CRUD - CREATE
//Crear un usuario
const createUser = async (userData) => {
    try {
        // Validar datos del usuario
        await validateUniqueEmail(userData.email);
        await validateNameLength(userData.name);
        await validateValidRole(userData.roleId);

        // Mapear roleId a role_id para que coincida con el modelo
        const userDataForDB = {
            name: userData.name,
            email: userData.email,
            password: userData.password || null, // Opcional
            role_id: userData.roleId
        };

        // Crear usuario
        const newUser = await usr.create(userDataForDB);
        return newUser;
    } catch (error) {
        console.error('Error en createUser:', error);
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

//CRUD - READ
// Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        const users = await usr.findAll();
        return users;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
};

//CRUD - READ by ID
// Obtener un usuario por su ID
const getUserById = async (id) => {
    try {
        const user = await usr.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
};

//CRUD - UPDATE
// Actualizar un usuario por su ID
const updateUser = async (id, userData) => {
    try {
        console.log('🔄 Actualizando usuario:', { id, userData });
        
        const user = await getUserById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Validar solo si el email ha cambiado
        if (userData.email && userData.email !== user.email) {
            await validateUniqueEmail(userData.email, id);
        }
        
        // Validar nombre si se proporciona
        if (userData.name) {
            await validateNameLength(userData.name);
        }
        
        // Validar rol si se proporciona
        if (userData.roleId) {
            await validateValidRole(userData.roleId);
        }

        // Mapear roleId a role_id para la base de datos
        const updateData = { ...userData };
        if (userData.roleId) {
            updateData.role_id = userData.roleId;
            delete updateData.roleId;
        }

        console.log('📝 Datos a actualizar en BD:', updateData);
        
        const [affectedRows] = await usr.update(updateData, { where: { id } });
        
        if (affectedRows === 0) {
            throw new Error('No se pudo actualizar el usuario');
        }

        // Obtener el usuario actualizado
        const updatedUser = await getUserById(id);
        console.log('✅ Usuario actualizado exitosamente:', updatedUser.toJSON());
        
        return updatedUser;
    } catch (error) {
        console.error('❌ Error en updateUser:', error.message);
        throw error;
    }
};

//CRUD - DELETE
// Eliminar un usuario por su ID
const deleteUser = async (id) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await usr.destroy({ where: { id } });
        return user;
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};

module.exports = {
    validateUniqueEmail,
    validateValidRole,
    validateNameLength,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
