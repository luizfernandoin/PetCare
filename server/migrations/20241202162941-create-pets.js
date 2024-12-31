'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      raca: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      porte: {
        type: Sequelize.ENUM('pequeno', 'medio', 'grande'),
        allowNull: false,
        validate: {
          isIn: [['pequeno', 'medio', 'grande']],
        },
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      caracteristicas: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pets');
  },
};
