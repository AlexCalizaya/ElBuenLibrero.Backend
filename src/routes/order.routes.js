import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, finishPurchase } from '../controllers/order.controller.js';

const router = Router();

// Orders
router.get('/', getOrders);
router.get('/getById', getOrderById);
router.post('/createOrder', createOrder);
router.put('/', updateOrder);
router.delete('/', deleteOrder);
router.post('/finishPurchase', finishPurchase);

export default router;