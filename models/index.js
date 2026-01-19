import sequelize from '../config/database.js';
import User from './usersmodel/user.js';
import Expense from './expensesmodel/expense.js';
import Landlord from './landlordsmodel/landlord.js';
import Payment from './paymentsmodel/payment.js';
import Property from './propertiesmodel/propertie.js';
import Tenant from './tenantsmodel/tenant.js';
import Worker from './workersmodel/worker.js';

// 🔥 INITIALIZE ALL MODELS
User.initModel(sequelize);
Expense.initModel(sequelize);
Landlord.initModel(sequelize);
Payment.initModel(sequelize);
Property.initModel(sequelize);
Tenant.initModel(sequelize);
Worker.initModel(sequelize);

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  Expense,
  Landlord,
  Payment,
  Property,
  Tenant,
  Worker,
};

export default db;
