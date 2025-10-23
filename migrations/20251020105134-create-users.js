'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      idRole: {   
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',  
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nom: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      mot_de_passe: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      adresse: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      },
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
