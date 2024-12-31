import { Sequelize, DataTypes, Model, Optional, CreationOptional, ForeignKey } from "sequelize";

class TrabalhaClinica extends Model {
    declare userId: ForeignKey<string>;
    declare clinicaId: ForeignKey<string>;
}

const TrabalhaClinicaModel = (sequelize: Sequelize) => {
    TrabalhaClinica.init({
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        clinicaId: {
            type: DataTypes.UUID,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        }
    }, {
        sequelize,
        tableName: 'TrabalhaClinica',
        timestamps: false
    });

    return TrabalhaClinica;
};

export default TrabalhaClinicaModel;