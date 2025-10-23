// models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produits: {
      type: DataTypes.JSON, // array de produits avec quantité
      allowNull: true,
    },
    prixTotal: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  }, {
    tableName: 'carts',
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.user, { foreignKey: 'idUtilisateur' });
  };

  return Cart;
};
