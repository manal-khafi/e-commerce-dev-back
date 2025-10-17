const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const user = require('./user');
const product = require('./product');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    listeProduits:{
        type: DataTypes.JSON,
        allowNull: false,        
    },
    dateCommande: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  
    },
    statut: {
        type: DataTypes.STRING,
        defaultValue: 'en cours',
    },
    prixTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'orders',
});

user.hasMany(Order, { foreignKey: 'idUtilisateur' });
Order.belongsTo(user, { foreignKey: 'idUtilisateur' });
module.exports = Order;
