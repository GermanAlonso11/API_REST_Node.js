//Importar modelo
import usr from '../models/User.js';
import roleController from '../controllers/roleController';

//Validar email unico con manejo de errores
export const validateUniqueEmail = async (email) => {
    try {
        const user = await usr.findOne({ where: { email } });
        if (user) {
            throw new Error('El email ya está en uso');
        }
    } catch (error) {
        throw new Error('Error al validar el email');
    }
};

//Validar rol valido
export const validateValidRole = async (roleId) => {
    try {
        const role = await roleController.getRoleById(roleId);
        if (!role) {
            throw new Error('El rol no es válido');
        }
    } catch (error) {
        throw new Error('Error al validar el rol');
    }
};

//Validar cantidad de caracteres para nombre (entre 2 y 50 caracteres)
export const validateNameLength = (name) => {
    if (name.length < 2 || name.length > 50) {
        throw new Error('El nombre debe tener entre 2 y 50 caracteres');
    }
};

//SECCION DE CRUD

//CRUD - CREATE
//Crear un usuario
export const createUser = async (userData) => {
    try {
        // Validar datos del usuario
        await validateUniqueEmail(userData.email);
        await validateNameLength(userData.name);
        await validateValidRole(userData.roleId);

        // Crear usuario
        const newUser = await usr.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

//CRUD - READ
// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const users = await usr.findAll();
        return users;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
};

//CRUD - READ by ID
// Obtener un usuario por su ID
export const getUserById = async (id) => {
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
export const updateUser = async (id, userData) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Validar y actualizar datos del usuario
        await validateUniqueEmail(userData.email);
        await validateNameLength(userData.name);
        await validateValidRole(userData.roleId);

        await usr.update(userData, { where: { id } });
        return { ...user, ...userData };
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};

//CRUD - DELETE
// Eliminar un usuario por su ID
export const deleteUser = async (id) => {
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
