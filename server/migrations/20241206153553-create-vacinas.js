'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vacinas', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      validade: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      fabricante: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      lote: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      serviceId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vacinas');
  }
};
