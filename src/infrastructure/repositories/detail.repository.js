import { pool } from '../../config/db.js';

class DetailRepository {
    async getAllDetails() {
        const sql = `SELECT * FROM details`;
        const result = await pool.query(sql);
        return result.rows;
    }

    async getDetailById(id) {
        const sql = `SELECT * FROM details WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

    async createDetail(detail) {
        const sql = `INSERT INTO details (order_id, book_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(sql, [detail.order_id, detail.book_id, detail.price, detail.quantity]);
        return result.rows[0];
    }

    async createMultipleDetails(details) {
        if (!details.length) return [];

        const values = [];
        const placeholders = [];

        details.forEach((detail, index) => {
            const offset = index * 4;
            placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`);
            values.push(detail.order_id, detail.book_id, detail.price, detail.quantity);
        });

        const sql = `
            INSERT INTO details (order_id, book_id, price, quantity)
            VALUES ${placeholders.join(', ')}
            RETURNING *
        `;

        const result = await pool.query(sql, values);
        return result.rows;
    }


    async updateDetail(id, detail) {
        const sql = `UPDATE details SET name = $1, email = $2, phone = $3, address = $4, notes = $5 WHERE id = $6 RETURNING *`;
        const result = await pool.query(sql, [detail.name, detail.email, detail.phone, detail.address, detail.notes, id]);
        return result.rows[0];
    }

    async deleteDetail(id) {
        const sql = `DELETE FROM details WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rowCount;
    }
}

export default new DetailRepository();