'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        nom: 'John Doe',
        email: 'john@example.com',
        mot_de_passe: 'password123',
        adresse: '123 Street',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Alice Smith',
        email: 'alice@example.com',
        mot_de_passe: 'alice123',
        adresse: '456 Avenue',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
