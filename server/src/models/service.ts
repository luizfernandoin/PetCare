import { DataTypes, Model, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../config/sequelize";
import Clinica from "./clinic";
import Vacina from "./vaccine";
import Atendimento from "./atendimento";


class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
    declare id: CreationOptional<string>;
    declare tipo: 'Consulta' | 'Vacinação' | 'Exame' | 'Outros';
    declare observacoes: CreationOptional<string>;
    declare clinicaId: ForeignKey<string>;

    async getOwnerId(id: string): Promise<string | null> {
        const service = await Service.findByPk(id, {
            include: Clinica,
        });

        return service ? service.clinicaId : null;
    }
}

Service.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tipo: {
        type: DataTypes.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    clinicaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
    },
}, {
    sequelize: db,
    tableName: 'services',
    timestamps: false
});

Service.hasMany(Vacina, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
Vacina.belongsTo(Service, {
foreignKey: 'serviceId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});

Service.hasMany(Atendimento, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Atendimento.belongsTo(Service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export default Service;