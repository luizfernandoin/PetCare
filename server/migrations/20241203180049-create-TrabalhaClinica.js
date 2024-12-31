'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrabalhaClinica', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      clinicaId: {
        type: Sequelize.UUID,
        references: {
          model: 'clinicas',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrabalhaClinica');
  }
};
