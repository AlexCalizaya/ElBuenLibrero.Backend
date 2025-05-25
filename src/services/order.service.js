import OrderRepository from '../infrastructure/repositories/order.repository.js';
import ClientRepository from '../infrastructure/repositories/client.repository.js';
import { createVoucherExternal } from '../infrastructure/external/hiring.external.js';
import DetailRepository from '../infrastructure/repositories/detail.repository.js';
import BookRepository from '../infrastructure/repositories/book.repository.js';

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

    async finishPurchase(purchase) {

        // Estado del cliente
        let clientResponse = await ClientRepository.getClientByDocNumber(purchase.client.doc_number);

        console.log("buscandoCliente",clientResponse);

        if (!clientResponse) {
            console.log("no existe cliente");
            clientResponse = await ClientRepository.createClient(purchase.client);
        }
        else {
            console.log("existe cliente");
            clientResponse =await ClientRepository.updateClient(clientResponse.id, purchase.client);
        }

        // Restar stock
        const bookIds = purchase.bookList.map(item => item.book.id);
        console.log("bookIds",bookIds);
        const currentBooks = await BookRepository.getBooksByIds(bookIds);
        console.log("currentBooks",currentBooks);

        for (const item of purchase.bookList) {
            const currentBook = currentBooks.find(b => b.id === item.book.id);
            if (!currentBook) {
                throw new Error(`El libro con id ${item.book.id} no existe`);
            }
            if (currentBook.stock - item.quantity < 0) {
                throw new Error(`Se ha acabado el stock para el libro: ${currentBook.name}`);
            }
        }

        const updatedStocks = purchase.bookList.map(item => {
            const currentBook = currentBooks.find(b => b.id === item.book.id);
            return {
                id: currentBook.id,
                stock: currentBook.stock - item.quantity
            };
        });

        const updatedStocksResponse = await BookRepository.updateMultipleStock(updatedStocks);
        console.log("updatedStocksResponse",updatedStocksResponse);

        // Generación del voucher
        const voucherPayload = {
            type: purchase.voucher,
            products: purchase.bookList.map(item => ({
                      name: item.book.name,
                      price: item.book.price,
                      quantity: item.quantity
            })),
            client: {
                type: purchase.client.doc_type,
                number: purchase.client.doc_number,
                name: purchase.client.first_name + " " + purchase.client.last_name,
            }
        };
        const voucherResponse = await createVoucherExternal(voucherPayload);

        // Crear Order
        const orderPayload = {
            client_id: clientResponse.id,
            voucher_type: purchase.voucher,
            voucher_number: voucherResponse.data.number,
            voucher_pdf: voucherResponse.data.pdf,
        };
        const orderResponse = await OrderRepository.createOrder(orderPayload);

        // Crear Order Details
        const details = purchase.bookList.map(item => ({
            order_id: orderResponse.id,
            book_id: item.book.id,
            price: item.book.price,
            quantity: item.quantity
        }));
        await DetailRepository.createMultipleDetails(details);
        
        return orderResponse;
    }
}

export default new OrderService();