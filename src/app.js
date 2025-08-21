const express = require('express');
const testConnection = require('./config/database');
const initDatabase = require('./scripts/initDB');

const app = express();

//Configuracion de middleware

//Inicializar la base de datos
const startServer = async () => {
    try {
        await testConnection();
        console.log('Conexión a la base de datos exitosa.');

        // Inicializar la base de datos
        await initDatabase();

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
