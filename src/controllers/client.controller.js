import ClientService from '../services/client.service.js';

export const getClients = async (_, res) => {
    try {
        console.log('hola');
        const clients = await ClientService.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los clientes: ' + error.message });
    }
}

export const getClientById = async (req, res) => {
    try {
        console.log("estoy en client id");
        const client = await ClientService.getClientById(req.query.id);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente: ' + error.message });
    }
}

export const getClientByDocNumber = async (req, res) => {
    try {
        console.log("estoy en client by doc number");
        const client = await ClientService.getClientByDocNumber(req.query.docNumber);
        console.log(client);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente: ' + error.message });
    }
}

export const createClient = async (req, res) => {
    try {
        const client = await ClientService.createClient(req.body);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente: ' + error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        const client = await ClientService.updateClient(req.query.id, req.body);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente: ' + error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const client = await ClientService.deleteClient(req.query.id);
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente: ' + error.message });
    }
}
