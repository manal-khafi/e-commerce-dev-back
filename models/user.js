// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    tableName: 'users',
  });

  User.associate = (models) => {
    User.belongsTo(models.role, { foreignKey: 'idRole' });
    User.hasMany(models.order, { foreignKey: 'idUtilisateur' });
    User.hasOne(models.cart, { foreignKey: 'idUtilisateur' });
  };
  
  return User;
};


