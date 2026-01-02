import express from 'express';
import { propertiescontollers } from '../../controllers/index.js';

const router = express.Router();

router.get('/', propertiescontollers.getAllProperties);
router.post('/', propertiescontollers.createProperty);
router.put('/:id', propertiescontollers.updateProperty);
router.delete('/:id', propertiescontollers.deleteProperty);

export default router;