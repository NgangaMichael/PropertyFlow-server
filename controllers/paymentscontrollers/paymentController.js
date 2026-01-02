import { paymentService } from '../../services/index.js';

export const getAllPayments = async (req, res) => {
  const payments = await paymentService.getAllPaymentsService();
  res.json(payments);
};

export const createPayment = async (req, res) => {
  const { tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes } = req.body;

  try {
    const payment = await paymentService.createPaymentService({
      tenantid, 
      propertyid, 
      amount, 
      paymenttype, 
      paymentmethod, 
      reference, 
      notes
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes } = req.body;

  try {
    const updatedPayment = await paymentService.updatePaymentService(id, {
      tenantid, 
      propertyid, 
      amount, 
      paymenttype, 
      paymentmethod, 
      reference, 
      notes
    });

    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await paymentService.deletePaymentService(id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};