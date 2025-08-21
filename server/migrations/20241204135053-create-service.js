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
      type: {
        type: Sequelize.ENUM('Consultation', 'Vaccination', 'Exam', 'Other'),
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      clinicId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clinics',
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
