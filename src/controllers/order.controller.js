import OrderService from '../services/order.service.js';

export const getOrders = async (_, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos las órdenes: ' + error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden: ' + error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const order = await OrderService.createOrder(req.body);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden: ' + error.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const order = await OrderService.updateOrder(req.params.id, req.body);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la orden: ' + error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await OrderService.deleteOrder(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden: ' + error.message });
    }
}
