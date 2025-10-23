'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('order_product', [
      
      { orderId: 10, productId: 5, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 10, productId: 6, quantity: 2, createdAt: new Date(), updatedAt: new Date() },
      
      
      { orderId: 9, productId: 5, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 9, productId: 7, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      
      
      { orderId: 10, productId: 5, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_product', null, {});
  }
};

