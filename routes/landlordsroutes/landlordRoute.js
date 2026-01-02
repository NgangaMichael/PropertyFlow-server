import express from 'express';
import { landlordController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', landlordController.getAllLandlords);
router.post('/', landlordController.createLandlord);
router.put('/:id', landlordController.updateLandlord);
router.delete('/:id', landlordController.deleteLandlord);

export default router;