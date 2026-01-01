import { DataTypes, Model } from 'sequelize';

export default class Tenant extends Model {
  static initModel(sequelize) {
    Tenant.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idnumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        propertyid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        leasestarts: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        leaseends: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Tenant',
        tableName: 'tenants',
        timestamps: true,
      }
    );
  }
}