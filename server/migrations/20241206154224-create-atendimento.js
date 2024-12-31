'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atendimentos', {
      profissionalId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { 
          model: 'users', 
          key: 'id' 
        },
        primaryKey: true,
      },
      petId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { 
          model: 'pets', 
          key: 'id' 
        },
        primaryKey: true,
      },
      serviceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { 
          model: 'services', 
          key: 'id' 
        },
        primaryKey: true,
      },
      dataAtendimento: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
      },
      observacao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('atendimentos');
  },
};

