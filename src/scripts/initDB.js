const sequelize = require('../config/database');
const syncModels = require('../models').syncModels;
const Role = require('../models/Role');

const initDatabase = async () => {
    try {
        // Sincronizar modelos con la base de datos
        await syncModels();

        // Crear roles predeterminados si no existen
        const defaultRoles = [
            { name: 'Administrador', description: 'Acceso completo al sistema' },
            { name: 'Lider de Proyecto', description: 'Gestiona proyectos y equipos' },
            { name: 'Desarrollador', description: 'Implementa funcionalidades' },
            { name: 'QA', description: 'Revisa y valida el trabajo' },
            // { name: 'Cliente', description: 'Visualiza el progreso del proyecto' }
            
        ];

        for (const roleData of defaultRoles) {
            await Role.findOrCreate({
                where: { name: roleData.name },
                defaults: roleData
            });
        };

        console.log('Base de datos inicializada correctamente.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
}

// Exportar la función de inicialización
module.exports = initDatabase;