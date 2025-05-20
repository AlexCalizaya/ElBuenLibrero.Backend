import { pool } from '../../config/db.js';

class ClientRepository {
    async getAllClients() {
        const sql = `SELECT * FROM clients`;
        const result = await pool.query(sql);
        return result.rows;
    }

    async getClientById(id) {
        const sql = `SELECT * FROM clients WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rows[0];
    }

    async createClient(client) {
        const sql = `INSERT INTO clients (doc_type, doc_number, first_name, last_name, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const result = await pool.query(sql, [client.doc_type, client.doc_number, client.first_name, client.last_name, client.phone, client.email]);
        return result.rows[0];
    }

    async updateClient(id, client) {
        const sql = `UPDATE clients SET doc_type = $1, doc_number = $2, first_name = $3, last_name = $4, phone = $5, email = $6 WHERE id = $7 RETURNING *`;
        const result = await pool.query(sql, [client.doc_type, client.doc_number, client.first_name, client.last_name, client.phone, client.email, id]);
        return result.rows[0];
    }

    async deleteClient(id) {
        const sql = `DELETE FROM clients WHERE id = $1`;
        const result = await pool.query(sql, [id]);
        return result.rowCount;
    }
}

export default new ClientRepository();