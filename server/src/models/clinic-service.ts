import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";

class ClinicService extends Model {
    declare clinicId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
}

ClinicService.init({
    clinicId: {
        type: DataTypes.UUID,
        references: {
            model: 'clinics',
            key: 'id',
        },
        primaryKey: true,
    },
    serviceId: {
        type: DataTypes.UUID,
        references: {
            model: 'services',
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: db,
    tableName: 'clinic_services',
    timestamps: false
});

export default ClinicService;