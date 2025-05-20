import { Router } from 'express';
import { getDetails, getDetailById, createDetail, updateDetail, deleteDetail } from '../controllers/detail.controller.js';

const router = Router();

// Details
router.get('/', getDetails);
router.get('/:id', getDetailById);
router.post('/', createDetail);
router.put('/:id', updateDetail);
router.delete('/:id', deleteDetail);

export default router;