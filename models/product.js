// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantite_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  }, {
    tableName: 'products',
  });

  return Product;
};
