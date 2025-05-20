import BookService from '../services/book.service.js';

export const getBooks = async (_, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los libros: ' + error.message });
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await BookService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el libro: ' + error.message });
    }
}

export const createBook = async (req, res) => {
    try {
        const book = await BookService.createBook(req.body);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro: ' + error.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const book = await BookService.updateBook(req.params.id, req.body);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro: ' + error.message });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const result = await BookService.deleteBook(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro: ' + error.message });
    }
}
