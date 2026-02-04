// services/paymentService.js
import db from '../../models/index.js';

export const getAllPaymentsService = async () => {
  return await db.Payment.findAll({
    order: [['id', 'ASC']],
    include: [
      {
        model: db.Tenant,
        as: 'tenant', // Must match the 'as' in the association
        attributes: ['firstname', 'lastname', 'phone'] // Only fetch what you need
      },
      {
        model: db.Property,
        as: 'property',
        attributes: ['propertyname'] 
        // Note: To get 'owner', you might need to include Landlord here too
      }
    ]
  });
};

export const createPaymentService = async ({ tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes }) => {
  return await db.Payment.create({ tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes });
};

export const updatePaymentService = async (id, data) => {
  const payment = await db.Payment.findByPk(id);
  await payment.update(data);
  return payment;
};

export const deletePaymentService = async (id) => {
  const payment = await db.Payment.findByPk(id);
  if (!payment) throw new Error('Payment not found');
  await payment.destroy(); // ✅ Hard delete
  return payment;
};