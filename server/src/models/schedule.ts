import { Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";
import sequelize from "sequelize";


class Schedule extends Model {
    declare clinicId: ForeignKey<string>; 
    declare day: string;
    declare startTime: string;
    declare endTime: string;
};

Schedule.init({
    clinicId: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
        primaryKey: true,
    },
    day: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    startTime: {
        type: sequelize.TIME,
        allowNull: false,
    },
    endTime: {
        type: sequelize.TIME,
        allowNull: false,
    },
}, 
{
    tableName: 'schedules',
    sequelize: db,
    timestamps: false,
});


export default Schedule;