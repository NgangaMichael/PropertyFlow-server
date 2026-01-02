import express from 'express';
import userRoutes from './usersroutes/userRoute.js';
import expenseRoute from './expensesroutes/expenseRoute.js';
import landlordRoute from './landlordsroutes/landlordRoute.js';
import paymentRoute from './paymentsroutes/paymentRoute.js';
import propertiesroutes from './propertiesroutes/propertyRoute.js';
import tenantRoute from './tenantsroutes/tenantRoute.js';
import workerRoute from './workersroutes/workerRoute.js';
import authRoute from './authroutes/authRoute.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/expenses', expenseRoute);
router.use('/landlords', landlordRoute);
router.use('/payments', paymentRoute);
router.use('/properties', propertiesroutes);
router.use('/tenants', tenantRoute);
router.use('/workers', workerRoute);
router.use('/auth', authRoute);

export default router;