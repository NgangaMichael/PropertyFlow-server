import { DataTypes, Model } from 'sequelize';

export default class Propertie extends Model {
  static initModel(sequelize) {
    Propertie.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        propertyname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        propertytype: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rentamount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        depositamount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bedrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bathrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Propertie',
        tableName: 'properties',
        timestamps: true,
      }
    );
  }
}