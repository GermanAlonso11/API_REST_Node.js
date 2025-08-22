//Importar modelo
import Role from '../models/Role.js';
//Importar sequelize
import { Op } from 'sequelize';

//CRUD - CREATE
//Crear rol
export const createRole = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newRole = await Role.create({
            name,
            description
        }, {
            fields: ['name', 'description']
        });
        if (newRole) {
            return res.status(201).json({
                message: 'Role created successfully',
                data: newRole
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

//CRUD - READ
//Obtener todos los roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json({
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

//CRUD - READ - READ BY ID
//Obtener un rol por id
export const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findOne({
            where: {
                id
            }
        });
        if (role) {
            res.json({
                data: role
            });
        } else {
            res.status(404).json({
                message: 'Role not found',
                data: {}
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

//CRUD - READ - SEARCH BY NAME OR DESCRIPTION
//Buscar roles por nombre o descripción
export const searchRoles = async (req, res) => {
    const { query } = req.params;
    try {
        const roles = await Role.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json({
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

//CRUD - UPDATE
//Actualizar rol
export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const [updated] = await Role.update({
            name,
            description
        }, {
            where: { id }
        });
        if (updated) {
            const updatedRole = await Role.findOne({ where: { id } });
            return res.status(200).json({
                message: 'Role updated successfully',
                data: updatedRole
            });
        }
        throw new Error('Role not found');
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong',
            data: {}
        });
    }
};

//CRUD - DELETE
//Eliminar rol
export const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Role.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(200).json({
                message: 'Role deleted successfully',
                data: {}
            });
        }
        throw new Error('Role not found');
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong',
            data: {}
        });
    }
};

//Exportar controlador
export default {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
    searchRoles
};

