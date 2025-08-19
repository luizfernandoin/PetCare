import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import OwnerPet from './owner-pet';
import Pet from './pet';
import Clinic from './clinic';
import Employee from './employee';
import Atendimento from './atendimento';
import Service from './service';
import Review from './review';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare name: string;
    declare password: string;
    declare phone: string;
    declare location: {
        type: string;
        coordinates: [number, number];
    };
    declare role: 'CLIENTE' | 'PROFISSIONAL';
    declare image: CreationOptional<string>;

    public getPets!: () => Promise<Pet[]>;
    public removePets!: (pets: Pet[]) => Promise<void>;
    public addPet!: (pet: Pet) => Promise<void>;
    public removeClinic!: (clinic: Clinic) => Promise<void>;

    public async hasClinic(clinic: Clinic): Promise<boolean> {
        const employeeRecord = await Employee.findOne({
            where: {
                userId: this.id,
                clinicId: clinic.id
            }
        });
        return !!employeeRecord;
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('CLIENTE', 'PROFISSIONAL'),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'users',
});

User.belongsToMany(Pet, { 
    through: OwnerPet,
    foreignKey: 'userId',
    otherKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Pet.belongsToMany(User, { 
    through: OwnerPet,
    foreignKey: 'petId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(Clinic, {
    through: Employee,
    foreignKey: 'userId',
    otherKey: 'clinicId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Clinic.belongsToMany(User, {
    through: Employee,
    foreignKey: 'clinicId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.hasMany(Atendimento, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Atendimento.belongsTo(User, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(Service, { 
    through: Review,
    foreignKey: 'userId',
    otherKey: 'serviceId'
});

Service.belongsToMany(User, { 
    through: Review,
    foreignKey: 'serviceId',
    otherKey: 'userId'
});


export default User;