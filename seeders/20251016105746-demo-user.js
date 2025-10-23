'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        nom: 'John Doe',
        email: 'john@example.com',
        mot_de_passe: bcrypt.hashSync('password123', 8),
        adresse: '123 Street',
        idRole: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nom: 'Alice Smith',
        email: 'alice@example.com',
        mot_de_passe: bcrypt.hashSync('alice123', 8),
        adresse: '456 Avenue',
        idRole: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
