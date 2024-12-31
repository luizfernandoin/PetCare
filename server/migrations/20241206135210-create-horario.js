module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('horarios', {
      dia: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      horaInicio: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
      },
      horaFim: {
        type: Sequelize.DataTypes.TIME,
        allowNull: false,
      },
      clinicaId: {
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
    await queryInterface.dropTable('horarios');
  }
};
