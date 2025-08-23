//Importar servicio
import * as userService from '../services/userService.js';

//CRUD - CREATE
//Crear usuario
export const createUser = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        const newUser = await userService.createUser({ name, email, password, roleId });
        return res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        return res.status(500).json({ 
            message: error.message,
            data: {}
        });
    }
};

//CRUD - READ
//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({
            message: 'Users fetched successfully',
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {}
        });
    }
};

//CRUD - READ by ID
//Obtener un usuario por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        return res.status(200).json({
            message: 'User fetched successfully',
            user
        });
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ 
                message: error.message,
                data: {}
            });
        } else {
            return res.status(500).json({
                message: error.message,
                data: {}
            });
        }
    }
};

//CRUD - UPDATE
//Actualizar un usuario por ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, roleId } = req.body;
    try {
        const updatedUser = await userService.updateUser(id, { name, email, password, roleId });
        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ 
                message: error.message,
                data: {}
            });
        } else {
            return res.status(500).json({
                message: error.message,
                data: {}
            });
        }
    }
};

//CRUD - DELETE
//Eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ 
                message: error.message,
                data: {}
            });
        } else {
            return res.status(500).json({
                message: error.message,
                data: {}
            });
        }
    }
};

//Exportar controlador
export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
