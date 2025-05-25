import { Router } from 'express';
import { getDetails, getDetailById, createDetail, updateDetail, deleteDetail } from '../controllers/detail.controller.js';

const router = Router();

// Details
router.get('/', getDetails);
router.get('/getById', getDetailById);
router.post('/', createDetail);
router.put('/', updateDetail);
router.delete('/', deleteDetail);

export default router;