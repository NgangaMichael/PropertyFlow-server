import { DataTypes, Model } from 'sequelize';

export default class Tenant extends Model {
  static initModel(sequelize) {
    Tenant.init(
      {
        // --- ORIGINAL FIELDS (UNTOUCHED) ---
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
          type: DataTypes.INTEGER, // Kept as Integer
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.INTEGER, // Kept as Integer
          allowNull: false,
          unique: true,
        },
        propertyid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        leasestarts: {
          type: DataTypes.STRING, // Kept as String
          allowNull: false,
        },
        leaseends: {
          type: DataTypes.STRING, // Kept as String
          allowNull: false,
        },

        // --- NEW FIELDS ADDED ---
        occupation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        maritalStatus: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isEmployed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        employerDetails: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        kraPin: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        numberOfChildren: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        alternativePhone1: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        alternativePhone2: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nextOfKinName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nextOfKinId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nextOfKinPhone: {
          type: DataTypes.STRING,
          allowNull: true,
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