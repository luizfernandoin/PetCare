import { Sequelize, DataTypes, Model, ForeignKey } from "sequelize";


class Horario extends Model {
    declare clinicaId: ForeignKey<string>; 
    declare dia: string;
    declare horaInicio: string;
    declare horaFim: string;
};

const horarioModel = (sequelize: Sequelize) => {
    Horario.init({
        clinicaId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, 
    {
        sequelize,
        tableName: 'horarios',
        timestamps: false,
    });

    return Horario
};

export default horarioModel;
