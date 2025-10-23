'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nom: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
