import { Router } from 'express';
import { getClients, getClientById, getClientByDocNumber, createClient, updateClient, deleteClient } from '../controllers/client.controller.js';

const router = Router();

// Clients
router.get('/', getClients);
router.get('/getById', getClientById);
router.get('/getByDocNumber', getClientByDocNumber);
router.post('/', createClient);
router.put('/', updateClient);
router.delete('/', deleteClient);

export default router;