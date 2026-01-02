import express from 'express';
import { workerController } from '../../controllers/index.js';

const router = express.Router();

router.get('/', workerController.getAllWorkers);
router.post('/', workerController.createWorker);
router.put('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

export default router;