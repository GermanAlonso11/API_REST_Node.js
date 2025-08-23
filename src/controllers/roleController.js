import RoleService from '../services/roleService.js';

const roleService = new RoleService();

// CRUD - CREATE
// Crear un nuevo rol
export const createRole = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newRole = await roleService.createRole({ name, description });
        return res.status(201).json({
            message: 'Role created successfully',
            role: newRole
        });
    } catch (error) {
        return res.status(500).json({ 
            message: error.message,
            data: {}
        });
    }
};

//CRUD - READ
// Obtener todos los roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        return res.status(200).json({
            message: 'Roles fetched successfully',
            roles
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: {}
        });
    }
};

//CRUD - READ by ID
// Obtener un rol por su ID
export const getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await roleService.getRoleById(id);
        res.json({
            data: role
        });
    } catch (error) {
        if (error.message === 'Role not found') {
            return res.status(404).json({ message: error.message,
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
// Actualizar un rol por su ID
export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedRole = await roleService.updateRole(id, { name, description });
        res.status(200).json({
            message: 'Role updated successfully',
            role: updatedRole
        });
    } catch (error) {
        if (error.message === 'Role not found') {
            return res.status(404).json({ message: error.message,
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
//Eliminar un rol por su ID
export const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        await roleService.deleteRole(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === 'Role not found') {
            return res.status(404).json({ message: error.message,
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

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
