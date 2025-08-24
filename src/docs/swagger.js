const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba Técnica API',
      version: '1.0.0',
      description: `API REST para gestión de usuarios y roles - Prueba técnica para puesto Jr Backend

**Notas importantes:**
- ✅ **Usar 'role_id' en todas las peticiones** (estándar del sistema)
- Los usuarios deben tener un role_id válido (1-4 para los roles predefinidos)
- El campo 'password' es opcional en la creación de usuarios
- Los roles predefinidos son: Administrador (1), Lider de Proyecto (2), Desarrollador (3), QA (4)

**Formato estándar para peticiones:**
\`\`\`json
{
  "name": "Nombre Usuario",
  "email": "usuario@email.com", 
  "password": "123456",
  "role_id": 2
}
\`\`\``,
      contact: {
        name: 'German Alonso Aguiniga Ascencio',
        email: 'german.alonso@email.com'
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
              example: '2024-08-23T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2024-08-23T10:30:00.000Z'
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
              example: '2024-08-23T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
              example: '2024-08-23T10:30:00.000Z'
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
