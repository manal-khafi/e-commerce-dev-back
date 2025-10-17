'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idUtilisateur: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // name of the related table
          key: 'id', // key in the users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      listeProduits: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      dateCommande: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      statut: {
        type: Sequelize.STRING,
        defaultValue: 'en cours',
      },
      prixTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
