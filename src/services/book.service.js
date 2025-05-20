import BookRepository from '../infrastructure/repositories/book.repository.js';

class BookService {
    async getAllBooks() {
        return await BookRepository.getAllBooks();
    }

    async getBookById(id) {
        return await BookRepository.getBookById(id);
    }

    async createBook(book) {
        return await BookRepository.createBook(book);
    }

    async updateBook(id, book) {
        return await BookRepository.updateBook(id, book);
    }

    async deleteBook(id) {
        const deletedRows = await UserRepository.deleteUser(id);
        if (deletedRows === 0) {
            throw new Error(`Libro no encontrado con id ${id}`);
        }
        return { message: 'Libro eliminado con éxito' };
    }
}

export default new BookService();