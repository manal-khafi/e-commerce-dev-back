'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        titre: 'Laptop Dell XPS 13',
        description: 'Ultra-portable laptop with Intel i7 processor',
        prix: 1200.50,
        quantite_stock: 10,
        sku: 'DELLXPS13',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Apple iPhone 15',
        description: 'Latest iPhone with A17 chip',
        prix: 999.99,
        quantite_stock: 15,
        sku: 'IPHONE15',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Logitech Mouse MX Master 3',
        description: 'Wireless mouse for productivity',
        prix: 99.99,
        quantite_stock: 50,
        sku: 'LOGIMX3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
