import OrderRepository from '../infrastructure/repositories/order.repository.js';

class OrderService {
    async getAllOrders() {
        return await OrderRepository.getAllOrders();
    }

    async getOrderById(id) {
        return await OrderRepository.getOrderById(id);
    }

    async createOrder(order) {
        return await OrderRepository.createOrder(order);
    }

    async updateOrder(id, order) {
        return await OrderRepository.updateOrder(id, order);
    }

    async deleteOrder(id) {
        const deletedRows = await OrderRepository.deleteOrder(id);
        if (deletedRows === 0) {
            throw new Error(`Orden no encontrado con id ${id}`);
        }
        return { message: 'Orden eliminado con éxito' };
    }
}

export default new OrderService();