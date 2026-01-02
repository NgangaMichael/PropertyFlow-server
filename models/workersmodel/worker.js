import { DataTypes, Model } from 'sequelize';

export default class Worker extends Model {
  static initModel(sequelize) {
    Worker.init(
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
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        salary: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        paymentfrequecy: {
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
        modelName: 'Worker',
        tableName: 'workers',
        timestamps: true,
      }
    );
  }
}