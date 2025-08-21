const datatypes = require('sequelize').DataTypes;
const sequelize = require('../config/database').sequelize;

const Role = sequelize.define('Role', {
  id: {
    type: datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name: {
    type: datatypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
    },
    description: {
    type: datatypes.STRING,
    allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: true
});

module.exports = Role;
    