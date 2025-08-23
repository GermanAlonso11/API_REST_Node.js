const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
        }
);

//Funcion para probar la conexión a la base de datos
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Coneccion a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
    }

// Exportar la instancia de Sequelize
module.exports = {
    sequelize,
    testConnection
};