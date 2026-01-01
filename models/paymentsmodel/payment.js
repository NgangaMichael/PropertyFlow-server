import { DataTypes, Model } from 'sequelize';

export default class Payment extends Model {
  static initModel(sequelize) {
    Payment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tenantid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        propertyid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        paymenttype: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentmethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        notes: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Payment',
        tableName: 'payments',
        timestamps: true,
      }
    );
  }
}