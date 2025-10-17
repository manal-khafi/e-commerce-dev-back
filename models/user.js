// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,   
    },
}, {  
  tableName: 'users', 
});

module.exports = User;


