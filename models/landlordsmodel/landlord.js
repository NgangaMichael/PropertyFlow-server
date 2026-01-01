import { DataTypes, Model } from 'sequelize';

export default class Landlord extends Model {
  static initModel(sequelize) {
    Landlord.init(
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
        idnumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bankname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bankaccountnumber: {
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
        modelName: 'Landlord',
        tableName: 'landlords',
        timestamps: true,
      }
    );
  }
}