import { Association, CreationOptional, DataTypes, Model } from 'sequelize';
import db from "../config/sequelize";
import Service from './service';
import Schedule from './schedule';
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

  declare services?: Service[];
  declare static associations: {
    services: Association<Clinic, Service>;
  };

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

Clinic.belongsToMany(Service, {
  through: 'clinic_services',
  foreignKey: 'clinicId',
  otherKey: 'serviceId',
  as: 'services'
});

Service.belongsToMany(Clinic, {
  through: 'clinic_services',
  foreignKey: 'serviceId',
  otherKey: 'clinicId',
  as: 'clinics'
});

Clinic.hasMany(Schedule, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Schedule.belongsTo(Clinic, {
  foreignKey: 'clinicId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


export default Clinic;