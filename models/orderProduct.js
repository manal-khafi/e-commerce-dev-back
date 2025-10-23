// models/OrderProduct.js
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('orderProduct', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'order_product',
  });

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.order, { foreignKey: 'orderId' });
    OrderProduct.belongsTo(models.product, { foreignKey: 'productId' });
  };

  return OrderProduct;
};
