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


