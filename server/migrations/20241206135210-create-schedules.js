module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
      day: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      startTime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
      },
      clinicId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'clinicas',
          key: 'id',
        },
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};
