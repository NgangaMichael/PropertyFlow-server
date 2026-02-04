import { DataTypes, Model } from 'sequelize';

export default class Expense extends Model {
  static initModel(sequelize) {
    Expense.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        expensetype: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paidto: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentmethod: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        modelName: 'Expense',
        tableName: 'expenses',
        timestamps: true,
      }
    );
  }
}