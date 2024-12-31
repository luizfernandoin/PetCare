'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('clinicas', {
          id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true,
          },
          nome: {
              type: Sequelize.STRING(100),
              allowNull: false,
          },
          telefone: {
              type: Sequelize.STRING(15),
              allowNull: false,
          },
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('clinicas');
  }
};
