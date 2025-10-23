'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        idUtilisateur: 1,
        listeProduits: JSON.stringify([
          { productId: 1, nom: 'Laptop Dell XPS 13', prix: 1200.50, quantite: 1 },
          { productId: 2, nom: 'Apple iPhone 15', prix: 999.99, quantite: 1 }
        ]),
        dateCommande: new Date(),
        statut: 'en cours',
        prixTotal: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUtilisateur: 2,
        listeProduits: JSON.stringify([
          { productId: 3, nom: 'Logitech Mouse MX Master 3', prix: 99.99, quantite: 1 }
        ]),
        dateCommande: new Date(),
        statut: 'livrée',
        prixTotal: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
