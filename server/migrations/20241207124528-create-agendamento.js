'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('appointments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            petId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'pets',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            serviceId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'services',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            clinicId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'clinics',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                primaryKey: true,
            },
            appointmentDate: {
                type: Sequelize.DATE,
                allowNull: false,
                primaryKey: true
            },
            startTime: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            endTime: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
            timestamps: false
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('appointments');
    },
};

