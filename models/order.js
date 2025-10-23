// models/Order.js
module.exports = (sequelize, DataTypes) => {
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
    listeProduits: {
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


  Order.associate = (models) => {
    Order.belongsTo(models.user, { foreignKey: 'idUtilisateur'});
    Order.belongsTo(models.cart, { foreignKey: 'idcart'});
    Order.belongsToMany(models.product, {
      through: models.orderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  };

  return Order;
};
