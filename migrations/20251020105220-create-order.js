'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      idUtilisateur: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // users table must exist first!
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idcart: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'carts', // carts table must exist first!
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      listeProduits: {
        type: Sequelize.JSON,
        allowNull: false
      },
      dateCommande: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      statut: {
        type: Sequelize.STRING,
        defaultValue: 'en cours'
      },
      prixTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
