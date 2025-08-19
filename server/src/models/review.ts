import { DataTypes, Model, ForeignKey } from 'sequelize';
import db from "../config/sequelize";

class Review extends Model {
    declare userId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare comment: string;
    declare rating: number;
}

Review.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
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
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
}, {
    sequelize: db,
    tableName: 'reviews',
});


export default Review;