const sequelize = require('sequelize');
const Role = require('./Role');
const User = require('./User');

//Establecer relaciones entre modelos
Role.hasMany(User, {
  foreignKey: 'role_id',
    as: 'users'
});
User.belongsTo(Role, {
  foreignKey: 'role_id',
    as: 'role'
});

//Sincronizar modelos con la base de datos (sirve para crear las tablas si no existen y evitar errores)
const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados correctamente.');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
    };

// Exportar los modelos y la función de sincronización
module.exports = {
    Role,
    User,
    syncModels
    };