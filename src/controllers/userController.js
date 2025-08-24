//Importar servicio
const userService = require('../services/userService.js');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//CRUD - CREATE
//Crear usuario
const createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    try {
        const newUser = await userService.createUser({ name, email, password, role_id });
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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
//CRUD - READ
//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User fetched successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
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
//Obtener un usuario por ID
const getUserById = async (req, res) => {
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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
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
//Actualizar un usuario por ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;
    try {
        const updatedUser = await userService.updateUser(id, { name, email, password, role_id });
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
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
//Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
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
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
