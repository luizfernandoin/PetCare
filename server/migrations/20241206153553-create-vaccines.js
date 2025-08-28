'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vaccines', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      manufacturer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      batchNumber: {
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
    await queryInterface.dropTable('vaccines');
  }
};
