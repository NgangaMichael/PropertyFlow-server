import express from 'express';
import { tenantController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', tenantController.getAllTenants);
router.post('/', tenantController.createTenant);
router.put('/:id', tenantController.updateTenant);
router.delete('/:id', tenantController.deleteTenant);

export default router;