import { CreationOptional, DataTypes, Model } from 'sequelize';
import db from "../config/sequelize";
import Service from './service';
import Horario from './horario';
import sequelize from 'sequelize';

class Clinic extends Model {
  declare id: string;
  declare name: string;
  declare phone: string;
  declare location: {
    type: string;
    coordinates: [number, number];
  };
  declare image: CreationOptional<string>;
};

Clinic.init({
  id: {
    type: sequelize.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING(100),
    allowNull: false,
  },
  phone: {
    type: sequelize.STRING(15),
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOMETRY("POINT"),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clinics',
  sequelize: db
});

Clinic.hasMany(Service, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Service.belongsTo(Clinic, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Clinic.hasMany(Horario, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Horario.belongsTo(Clinic, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


export default Clinic;