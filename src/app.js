const express = require('express');
const cors = require('cors');
const testConnection = require('./config/database');
const initDatabase = require('./scripts/initDB');

// Importar rutas
const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');

// Importar configuración de Swagger
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

const app = express();

//Configuracion de middleware
app.use(cors());
app.use(express.json());

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rutas
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

//Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

//Manejo de errores general
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({error: 'Error interno del servidor'});
});

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

module.exports = app;
