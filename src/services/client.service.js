import ClientRepository from '../infrastructure/repositories/client.repository.js';

class ClientService {
    async getAllClients() {
        return await ClientRepository.getAllClients();
    }

    async getClientById(id) {
        return await ClientRepository.getClientById(id);
    }

    async createClient(client) {
        return await ClientRepository.createClient(client);
    }

    async updateClient(id, client) {
        return await ClientRepository.updateClient(id, client);
    }

    async deleteClient(id) {
        const deletedRows = await ClientRepository.deleteClient(id);
        if (deletedRows === 0) {
            throw new Error(`Cliente no encontrado con id ${id}`);
        }
        return { message: 'Cliente eliminado con éxito' };
    }
}

export default new ClientService();