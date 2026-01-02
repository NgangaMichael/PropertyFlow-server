import express from 'express';
import { paymentController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', paymentController.getAllPayments);
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

export default router;