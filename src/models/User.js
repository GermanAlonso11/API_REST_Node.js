const datatypes = require('sequelize').DataTypes;
const sequelize = require('../config/database').sequelize;

const User = sequelize.define('User', {
  id: {
    type: datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: datatypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
    },
    email: {
    type: datatypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
    },
    password: {
    type: datatypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255]
    }
    },
    role_id: {
    type: datatypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id'
    }
    }
}, {
  tableName: 'users',
    timestamps: true
});

module.exports = User;
