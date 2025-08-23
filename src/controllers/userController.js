//Importar modelo
import usr from '../models/User.js';

//Importar sequelize
import {Op} from 'sequelize';

//CRUD - CREATE
//Crear usuario
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await usr.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//CRUD - READ
//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await usr.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener un usuario por ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usr.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Actualizar un usuario por ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await usr.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const updatedUser = await user.update({ name, email, password });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usr.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
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
