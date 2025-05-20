import { pool } from '../../config/db.js';

class BookRepository {
    async getAllBooks() {
        const sql = `SELECT * FROM books`;
        const result = await pool.query(sql);
        return result.rows;
    }

    async getBookById(id) {
        const sql = `SELECT * FROM books WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

    async createBook(book) {
        const sql = `INSERT INTO books (isbn, name, stock, price, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await pool.query(sql, [book.isbn, book.name, book.stock, book.price, book.image]);
        return result.rows[0];
    }

    async updateBook(id, book) {
        const sql = `UPDATE books SET isbn = $1, name = $2, stock = $3, price = $4, image = $5 WHERE id = $6 RETURNING *`;
        const result = await pool.query(sql, [book.isbn, book.name, book.stock, book.price, book.image, id]);
        return result.rows[0];
    }

    async deleteBook(id) {
        const sql = `DELETE FROM books WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rowCount;
    }
}

export default new BookRepository();