# API REST para Gestión de Usuarios y Roles con temática de Desarrolladores

API REST desarrollada con **Node.js**, **Express** y **Sequelize** para la gestión de usuarios y roles con documentación automática usando **Swagger**.

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

1. **Node.js** (versión 16 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`.

2. **npm** (incluido con Node.js)
   - Verifica la instalación: `npm --version`

3. **MySQL** (versión 8.0 o superior)
   - Descarga desde: https://dev.mysql.com/downloads/mysql/

4. **Git** (opcional, para clonar el repositorio)
   - Descarga desde: https://git-scm.com/

---

## ⚙️ Instalación y Configuración

### 1. **Clonar o descargar el proyecto**
```bash
# Si tienes Git instalado:
git clone https://github.com/GermanAlonso11/pruebaTecnica.git
cd pruebaTecnica

# O descarga el ZIP y extrae los archivos
```

### 2. **Instalar las dependencias del proyecto**
```bash
# Navegar al directorio del proyecto
cd pruebaTecnica

# Instalar todas las dependencias
npm install
```

Las siguientes librerías se instalarán automáticamente:
- **express**: Framework web para Node.js
- **sequelize**: ORM para base de datos
- **mysql2**: Driver de MySQL para Node.js
- **cors**: Middleware para manejar CORS
- **dotenv**: Manejo de variables de entorno
- **swagger-jsdoc**: Generación de documentación Swagger
- **swagger-ui-express**: Interfaz web para Swagger
- **nodemon**: Herramienta de desarrollo (devDependency)

### 3. **Configurar las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con la siguiente información:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_NAME=bd_prueba_tecnica
DB_PASSWORD=tu_password_mysql

# Configuración del Servidor
NODE_ENV=development
PORT=3000
```

**⚠️ IMPORTANTE:** Reemplaza `tu_password_mysql` con la contraseña real de tu usuario MySQL.

---

## 🗄️ Configuración de Base de Datos

### 4. **Instalar y configurar MySQL**

1. Instala MySQL desde el sitio oficial
2. Durante la instalación, configura:
   - Usuario: `root`
   - Contraseña: (la que pongas en el archivo `.env`)
   - Puerto: `3306`

### 5. **Crear la base de datos**

Puedes crear la base de datos de la siguiente manera:

#### Opción A: MySQL Workbench
1. Inicia la conexion
2. Crea un nuevo query
3. Ejecuta el siguiente codigo: CREATE DATABASE bd_prueba_tecnica;
4. Clic en Ejecutar

No es necesario crear ninguna tabla, Sequelize se encarga de eso cuando se ejecuta el proyecto.

#### Opción B: Usando línea de comandos
```sql
# Conectar a MySQL
mysql -u root -p

# Crear la base de datos
CREATE DATABASE bd_prueba_tecnica;

# Salir de MySQL
exit
```

### 6. **Verificar la conexión**

El proyecto está configurado para:
- ✅ **Crear automáticamente las tablas** al iniciar el servidor
- ✅ **Insertar datos de prueba** (4 roles predefinidos)
- ✅ **Sincronizar el esquema** con los modelos de Sequelize

---

## 🚀 Ejecución del Proyecto

### 7. **Iniciar el servidor de desarrollo**

```bash
# Opción 1: Modo desarrollo (reinicia automáticamente)
npm run dev

# Opción 2: Modo producción
npm start
```

### 8. **Verificar que todo funciona**

Si todo está configurado correctamente, deberías ver:

```
[dotenv] injecting env variables from .env
Coneccion a la base de datos establecida correctamente.
Conexión a la base de datos exitosa.
Modelos sincronizados correctamente.
Base de datos inicializada correctamente.
Servidor escuchando en el puerto 3000
Documentación de API disponible en http://localhost:3000/api-docs
```

### 9. **Probar la API**

Abre tu navegador y visita:

- **API Base**: http://localhost:3000/api
- **Documentación Swagger**: http://localhost:3000/api-docs
- **Listar roles**: http://localhost:3000/api/roles
- **Listar usuarios**: http://localhost:3000/api/users

Personalmente recomiendo entrar a:
- http://localhost:3000/api-docs

Debido a que el proyecto fue testeado desde la UI de Swagger

---

## 📚 Documentación de la API

### 10. **Acceder a la documentación completa**

La documentación interactiva está disponible en:
**http://localhost:3000/api-docs**

Esta documentación incluye:
- ✅ Guía completa de uso de la API
- ✅ Ejemplos de peticiones y respuestas
- ✅ Validaciones y restricciones
- ✅ Códigos de error y sus significados
- ✅ Probador integrado para todas las rutas

### 11. **Endpoints principales**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/roles` | Obtener todos los roles |
| GET | `/api/roles/:id` | Obtener un rol específico |
| POST | `/api/roles` | Crear un nuevo rol |
| PUT | `/api/roles/:id` | Actualizar un rol existente |
| DELETE | `/api/roles/:id` | Eliminar un rol |
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/:id` | Obtener un usuario específico |
| POST | `/api/users` | Crear un nuevo usuario |
| PUT | `/api/users/:id` | Actualizar un usuario existente |
| DELETE | `/api/users/:id` | Eliminar un usuario |

---

## 📁 Estructura del Proyecto

```
pruebaTecnica/
├── src/
│   ├── config/
│   │   └── database.js         # Configuración de Sequelize
│   ├── controllers/
│   │   ├── roleController.js   # Controladores de roles
│   │   └── userController.js   # Controladores de usuarios
│   ├── docs/
│   │   └── swagger.js          # Configuración de Swagger
│   ├── middlewares/
│   │   └── validation.js       # Validaciones de entrada
│   ├── models/
│   │   ├── index.js           # Índice de modelos
│   │   ├── Role.js            # Modelo de Rol
│   │   └── User.js            # Modelo de Usuario
│   ├── routes/
│   │   ├── roles.js           # Rutas de roles
│   │   └── users.js           # Rutas de usuarios
│   ├── scripts/
│   │   └── initDB.js          # Inicialización de datos
│   ├── services/
│   │   ├── roleService.js     # Lógica de negocio de roles
│   │   └── userService.js     # Lógica de negocio de usuarios
│   └── app.js                 # Archivo principal de la aplicación
├── .env                       # Variables de entorno
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución JavaScript
- **Express.js**: Framework web minimalista
- **Sequelize**: ORM para JavaScript
- **MySQL**: Sistema de gestión de base de datos
- **Swagger**: Documentación de API
- **dotenv**: Gestión de variables de entorno
- **CORS**: Manejo de Cross-Origin Resource Sharing

---

## 🚨 Solución de Problemas Comunes

### Error: "ECONNREFUSED 127.0.0.1:3306"
- ✅ Verifica que MySQL esté ejecutándose
- ✅ Revisa las credenciales en el archivo `.env`
- ✅ Asegúrate que el puerto 3306 esté disponible

### Error: "listen EADDRINUSE :::3000"
- ✅ El puerto 3000 ya está en uso
- ✅ Cambia el puerto en `.env` o cierra la aplicación que use el puerto 3000

### Error: "Access denied for user"
- ✅ Verifica el usuario y contraseña en `.env`
- ✅ Asegúrate que el usuario tenga permisos para crear bases de datos

### Las tablas no se crean automáticamente
- ✅ Verifica que la base de datos `bd_prueba_tecnica` exista
- ✅ Revisa los logs del servidor para errores de conexión

---

## 👤 Autor

**German Alonso Aguiniga Ascencio**
- Email: german.aguiniga11@outlook.es
- GitHub: [@GermanAlonso11](https://github.com/GermanAlonso11)

