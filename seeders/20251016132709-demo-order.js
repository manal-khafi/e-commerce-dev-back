'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        idUtilisateur: 1,
        listeProduits: JSON.stringify([
          { idProduit: 1, nom: 'Clavier mécanique', prix: 500, quantite: 1 },
          { idProduit: 2, nom: 'Souris sans fil', prix: 250, quantite: 2 }
        ]),
        dateCommande: new Date(),
        statut: 'en cours',
        prixTotal: 500 + (250 * 2), // = 1000
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUtilisateur: 2,
        listeProduits: JSON.stringify([
          { idProduit: 3, nom: 'Écran Full HD', prix: 1200, quantite: 1 },
          { idProduit: 4, nom: 'Support écran', prix: 300, quantite: 1 }
        ]),
        dateCommande: new Date(),
        statut: 'livrée',
        prixTotal: 1200 + 300, // = 1500
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUtilisateur: 1,
        listeProduits: JSON.stringify([
          { idProduit: 5, nom: 'Casque audio', prix: 400, quantite: 1 }
        ]),
        dateCommande: new Date(),
        statut: 'annulée',
        prixTotal: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
