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

    async getBooksByIds(ids) {
        if (!ids.length) return [];

        const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');

        const sql = `SELECT * FROM books WHERE id IN (${placeholders})`;
        const result = await pool.query(sql, ids);
        return result.rows;
    }

    async getBookByISBN(isbn) {
        const sql = `SELECT * FROM books WHERE isbn ILIKE $1`;
        const result = await pool.query(sql, [`${isbn}%`]);
        return result.rows;
    }


    async getBookByName(name) {
        const sql = `SELECT * FROM books WHERE name ILIKE $1`;
        const result = await pool.query(sql, [`%${name}%`]);
        return result.rows;
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

    async updateMultipleStock(bookList) {
        const values = bookList.map((b, index) => `($${index * 2 + 1}::INTEGER, $${index * 2 + 2}::INTEGER)`).join(', ');
        const flatParams = bookList.flatMap(b => [b.id, b.stock]);

        const sql = `
            UPDATE books AS b
            SET stock = v.stock
            FROM (VALUES ${values}) AS v(id, stock)
            WHERE b.id = v.id
            RETURNING b.*;
        `;

        const result = await pool.query(sql, flatParams);
        return result.rows;
    }

    async deleteBook(id) {
        const sql = `DELETE FROM books WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rowCount;
    }
}

export default new BookRepository();