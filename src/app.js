const express = require('express');
const testConnection = require('./config/database');
const initDatabase = require('./scripts/initDB');

const app = express();

//Configuracion de middleware
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/roles', roleRoutes);

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
