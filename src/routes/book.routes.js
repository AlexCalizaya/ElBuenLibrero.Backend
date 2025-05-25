import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = Router();

// Books
router.get('/', getBooks);
router.get('/getById', getBookById);
router.post('/', createBook);
router.put('/', updateBook);
router.delete('/', deleteBook);

export default router;