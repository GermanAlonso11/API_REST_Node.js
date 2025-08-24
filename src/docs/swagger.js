const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba Técnica API',
      version: '1.0.0',
      description: `# 📋 API REST para Gestión de Usuarios y Roles enfocado a Desarrolladores
**Prueba técnica para puesto Backend Developer**

## 🚀 Guía de Uso de la API

### 📌 **Información General**
Esta API permite gestionar usuarios y roles con un sistema completo de CRUD (Crear, Leer, Actualizar, Eliminar). Todos los endpoints están protegidos con validaciones robustas y proporcionan mensajes de error descriptivos.

---

## 👥 **Gestión de Usuarios**

### ✅ **Crear Usuario** \`POST /api/users\`
**Campos requeridos:** \`name\`, \`email\`, \`password\`, \`role_id\`  

**Ejemplo de petición:**
\`\`\`json
{
  "name": "Juan Pérez",
  "email": "juan.perez@empresa.com",
  "password": "123456",
  "role_id": 2
}
\`\`\`

**Validaciones:**
- ✅ **name**: Entre 2 y 50 caracteres
- ✅ **email**: Formato de email válido y único en el sistema
- ✅ **password**: Mínimo 2 caracteres, máximo 12
- ✅ **role_id**: Debe existir en la tabla de roles (1-4 para roles predefinidos)

**Posibles errores:**
- \`400\`: Email ya existe, nombre muy corto/largo, role_id inválido
- \`500\`: Error del servidor

---

### 📖 **Consultar Usuarios** \`GET /api/users\`
Obtiene la lista completa de usuarios con toda su información.

**Respuesta incluye:**
- Datos básicos del usuario
- role_id asociado
- Fechas de creación y actualización

---

### 🔍 **Consultar Usuario por ID** \`GET /api/users/:id\`
Obtiene un usuario específico por su ID.

**Posibles errores:**
- \`404\`: Usuario no encontrado
- \`500\`: Error del servidor

---

### ✏️ **Actualizar Usuario** \`PUT /api/users/:id\`
Actualiza uno o varios campos de un usuario existente.

**Ejemplo de petición:**
\`\`\`json
{
  "name": "Juan Carlos Pérez",
  "email": "juan.carlos@empresa.com",
  "password": "123456789",
  "role_id": 3
}
\`\`\`

**Validaciones especiales:**
- ✅ **Email único**: Si cambias el email, no debe existir otro usuario con ese email
- ✅ **Validaciones por campo**: Solo valida los campos que envíes
- ✅ **role_id**: Debe existir si lo incluyes en la petición

**Posibles errores:**
- \`404\`: Usuario no encontrado
- \`400\`: Email ya en uso, validaciones de formato
- \`500\`: Error del servidor

---

### 🗑️ **Eliminar Usuario** \`DELETE /api/users/:id\`
Elimina un usuario del sistema permanentemente.

**⚠️ Importante:** Esta acción es irreversible

**Posibles errores:**
- \`404\`: Usuario no encontrado
- \`500\`: Error del servidor

---

## 🎭 **Gestión de Roles**

### ✅ **Crear Rol** \`POST /api/roles\`
**Campos requeridos:** \`name\`  
**Campo opcional:** \`description\`

**Ejemplo de petición:**
\`\`\`json
{
  "name": "Administrador",
  "description": "Acceso completo al sistema"
}
\`\`\`

**Validaciones:**
- ✅ **name**: Entre 2 y 50 caracteres, único en el sistema
- ✅ **description**: Opcional, sin límite específico

**Posibles errores:**
- \`400\`: Nombre ya existe, nombre muy corto/largo
- \`500\`: Error del servidor

---

### 📖 **Consultar Roles** \`GET /api/roles\`
Obtiene todos los roles.

**Respuesta incluye:**
- Información básica del rol
- Fechas de creación y actualización

**Ejemplo de respuesta:**
\`\`\`json
{
  "message": "Roles fetched successfully",
  "roles": [
    {
      "id": 1,
      "name": "Administrador",
      "description": "Acceso completo al sistema",
      "createdAt": "2025-08-23T...",
      "updatedAt": "2025-08-23T..."
    }
  ]
}
\`\`\`

---

### 🔍 **Consultar Rol por ID** \`GET /api/roles/:id\`
Obtiene un rol específico.

**Posibles errores:**
- \`404\`: Rol no encontrado
- \`500\`: Error del servidor

---

### ✏️ **Actualizar Rol** \`PUT /api/roles/:id\`
Actualiza la información de un rol existente.

**Validaciones especiales:**
- ✅ **Nombre único**: Si cambias el nombre, no debe existir otro rol con ese nombre
- ✅ **Integridad referencial**: No afecta a usuarios ya asignados

**Posibles errores:**
- \`404\`: Rol no encontrado
- \`400\`: Nombre ya en uso, validaciones de formato
- \`500\`: Error del servidor

---

### 🗑️ **Eliminar Rol** \`DELETE /api/roles/:id\`
Elimina un rol del sistema.

**⚠️ Importante:** 
- Si hay usuarios asignados al rol, se asignara el rol default "Desarrollador"
- Los usuarios asociados NO serán eliminados
- Esta acción es irreversible

**Posibles errores:**
- \`404\`: Rol no encontrado
- \`500\`: Error del servidor

---

## 🎯 **Roles Predefinidos**
El sistema viene con 4 roles predefinidos:

| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | Administrador | Acceso completo al sistema |
| 2 | Lider de Proyecto | Gestión de proyectos y equipos |
| 3 | Desarrollador | Desarrollo de software |
| 4 | QA | Testing y control de calidad |


---

## 🔍 **Estructura de Errores**
Todos los errores siguen el mismo formato:

\`\`\`json
{
  "message": "Descripción específica del error",
  "data": {}
}
\`\`\`

---
## 🔗 **URL Base**
- **Base de la API**: \`http://localhost:3000/api-docs\`
---

**Desarrollado por:** German Alonso Aguiniga Ascencio  
**Contacto:** german.aguiniga11@outlook.es`,
      contact: {
        name: 'German Alonso Aguiniga Ascencio',
        email: 'german.aguiniga11@outlook.es'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    tags: [
      {
        name: 'Users',
        description: 'Endpoints para gestión de usuarios'
      },
      {
        name: 'Roles',
        description: 'Endpoints para gestión de roles'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del usuario',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
              minLength: 2,
              maxLength: 100,
              example: 'Juan Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único del usuario',
              example: 'juan.perez@email.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario (opcional)',
              minLength: 6,
              maxLength: 255,
              example: 'password123'
            },
            role_id: {
              type: 'integer',
              description: 'ID del rol asignado al usuario',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2025-08-23T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2025-08-23T10:30:00.000Z'
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'role_id'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del usuario',
              minLength: 2,
              maxLength: 100,
              example: 'Juan Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único del usuario',
              example: 'juan.perez@email.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario (opcional)',
              minLength: 6,
              maxLength: 255,
              example: 'password123'
            },
            role_id: {
              type: 'integer',
              description: 'ID del rol asignado al usuario',
              example: 1
            }
          }
        },
        Role: {
          type: 'object',
          required: ['name'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del rol',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nombre del rol',
              minLength: 2,
              maxLength: 50,
              example: 'Desarrollador'
            },
            description: {
              type: 'string',
              description: 'Descripción del rol',
              example: 'Rol para desarrolladores de software'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2025-08-23T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2025-08-23T10:30:00.000Z'
            }
          }
        },
        RoleInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del rol',
              minLength: 2,
              maxLength: 50,
              example: 'Desarrollador'
            },
            description: {
              type: 'string',
              description: 'Descripción del rol',
              example: 'Rol para desarrolladores de software'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de éxito'
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            },
            data: {
              type: 'object',
              description: 'Datos adicionales del error'
            }
          }
        }
      }
    }
  },
  apis: [
    './src/controllers/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec
};
