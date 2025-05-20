import DetailRepository from '../infrastructure/repositories/detail.repository.js';

class DetailService {
    async getAllDetails() {
        return await DetailRepository.getAllDetails();
    }

    async getDetailById(id) {
        return await DetailRepository.getDetailById(id);
    }

    async createDetail(detail) {
        return await DetailRepository.createDetail(detail);
    }

    async updateDetail(id, detail) {
        return await DetailRepository.updateDetail(id, detail);
    }

    async deleteDetail(id) {
        const deletedRows = await DetailRepository.deleteDetail(id);
        if (deletedRows === 0) {
            throw new Error(`Detalle no encontrado con id ${id}`);
        }
        return { message: 'Detalle eliminado con éxito' };
    }
}

export default new DetailService();