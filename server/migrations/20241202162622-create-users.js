'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      num: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('Cliente', 'Profissional'),
        allowNull: false,
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
    await queryInterface.dropTable('users');
  },
};
