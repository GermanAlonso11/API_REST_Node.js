//Importar modelo
const Role = require('../models/Role.js');

const DEFAULT_ROLE = 'Desarrollador';

//Clase servicio para manejar la lógica de negocio relacionada con roles
class RoleService {
    //Crear un nuevo rol
    async createRole(data) {
        try {
            //Verificar si el rol ya existe
            const existingRole = await Role.findOne({
                where: { name: data.name }
            });
            if (existingRole) {
                throw new Error('Role already exists');
            }

            //Crear el nuevo rol
            return await Role.create(data, {
                fields: ['name', 'description']
            });
            
        } catch (error) {
            // Manejo de errores
            throw new Error('Error creating role: ' + error.message);
        }
    }

    //Obtener todos los roles
    async getAllRoles() {
        try {
            return await Role.findAll({
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error("Error fetching roles: " + error.message);
        }
    }

    //Obtener un rol por su ID
    async getRoleById(id) {
        try {
            //Buscar el rol por su ID
            const role = await Role.findByPk(id);
            if (!role) {
                throw new Error('Role not found');
            }
            return role;
        } catch (error) {
            throw new Error('Error fetching role: ' + error.message);
        }
    }

    //Actualizar un rol por su ID
    async updateRole(id, data) {
        try {
            const role = await this.getRoleById(id);
            if (!role) {
                throw new Error('Role not found');
            }
            
            //Si se esta cambiando el nombre, verificar si ya existe otro rol con ese nombre
            if (data.name) {
                const existingRole = await Role.findOne({
                    where: { name: data.name, id: { [Op.ne]: id } }
                });
                if (existingRole) {
                    throw new Error('Role with this name already exists');
                }
            }
            //Actualizar el rol
            await role.update(data);
            return role;

        } catch (error) {
            throw new Error('Error updating role: ' + error.message);
        }
    }

    //Eliminar un rol por su ID
    async deleteRole(id) {
        try {
            const role = await this.getRoleById(id);
            if (!role) {
                throw new Error('Role not found');
            }

            //Verificar si hay usuarios asociados al rol
            const usersWithRole = await role.getUsers();
            
            //Si el rol que se va a eliminar es el de Desarrollador, no se puede eliminar
            if (role.name === DEFAULT_ROLE) {
                throw new Error('Cannot delete the default role: Desarrollador');
            }

            //Buscar si el rol tiene usuarios asociados, si los tiene, asociar el rol de Desarrollador a esos usuarios
            if (usersWithRole.length > 0) {
                const developerRole = await Role.findOne({
                    where: { name: DEFAULT_ROLE }
                });
                if (!developerRole) {
                    throw new Error('Default role not found');
                }

                //Asignar el rol de Desarrollador a los usuarios
                await Promise.all(usersWithRole.map(user => user.setRole(developerRole)));
            }

            //Eliminar el rol original
            await role.destroy();
            
            //Retornar
            return { message: 'Role deleted successfully' };

        } catch (error) {
            throw new Error('Error deleting role: ' + error.message);
        }
    }
}

module.exports = RoleService;