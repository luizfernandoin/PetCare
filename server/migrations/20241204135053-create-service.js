'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tipo: {
        type: Sequelize.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      clinicaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clinicas',
          key: 'id',
        }
      }
    }, {
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('services');
  }
};
