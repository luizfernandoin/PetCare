'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DonoPet', {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      petId: {
        type: Sequelize.UUID,
        references: {
          model: 'pets',
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
      }
    }, {
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DonoPet');
  }
};

