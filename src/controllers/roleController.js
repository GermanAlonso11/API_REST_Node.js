import RoleService from '../services/roleService.js';

const roleService = new RoleService();

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role created successfully
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Roles fetched successfully
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role fetched successfully
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//CRUD - READ by ID
// Obtener un rol por su ID
export const getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await roleService.getRoleById(id);
        return res.status(200).json({
            message: 'Role fetched successfully',
            role
        });
    } catch (error) {
        if (error.message === 'Role not found') {
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

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role updated successfully
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//CRUD - UPDATE
// Actualizar un rol por su ID
export const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedRole = await roleService.updateRole(id, { name, description });
        return res.status(200).json({
            message: 'Role updated successfully',
            role: updatedRole
        });
    } catch (error) {
        if (error.message === 'Role not found') {
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

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a eliminar
 *     responses:
 *       204:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//CRUD - DELETE
//Eliminar un rol por su ID
export const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        await roleService.deleteRole(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === 'Role not found') {
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

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
