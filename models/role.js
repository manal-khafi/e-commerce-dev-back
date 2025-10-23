// models/Role.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'roles',
  });

  Role.associate = (models) => {
    Role.hasMany(models.user, { foreignKey: 'idRole' });
  };

  return Role;
};
