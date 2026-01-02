import db from '../../models/index.js';

export const getAllPaymentsService = async () => {
  return await db.Payment.findAll({
    order: [['id', 'ASC']],
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