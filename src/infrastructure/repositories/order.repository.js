import { pool } from '../../config/db.js';

class OrderRepository {
    async getAllOrders() {
        const sql = `SELECT * FROM orders`;
        const result = await pool.query(sql);
        return result.rows;
    }

    async getOrderById(id) {
        const sql = `SELECT * FROM orders WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

    async createOrder(order) {
        const sql = `INSERT INTO orders (client_id, voucher_type, voucher_number, voucher_pdf) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(sql, [order.client_id, order.voucher_type, order.voucher_number, order.voucher_pdf]);
        return result.rows[0];
    }
    async updateOrder(id, order) {
        const sql = `UPDATE orders SET client_id = $1, voucher_type = $2, voucher_number = $3, voucher_pdf = $4 WHERE id = $5 RETURNING *`;
        const result = await pool.query(sql, [order.client_id, order.voucher_type, order.voucher_number, order.voucher_pdf, id]);
        return result.rows[0];
    }

    async deleteOrder(id) {
        const sql = `DELETE FROM orders WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rowCount;
    }
}

export default new OrderRepository();