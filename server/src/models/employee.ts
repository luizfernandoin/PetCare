import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";


class Employee extends Model {
    declare userId: ForeignKey<string>;
    declare clinicId: ForeignKey<string>;
}

Employee.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    clinicId: {
        type: DataTypes.UUID,
        references: {
            model: 'clinics',
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: db,
    tableName: 'employees',
    timestamps: false
});


export default Employee;