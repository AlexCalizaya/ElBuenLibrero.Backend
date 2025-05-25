import DetailService from '../services/detail.service.js';

export const getDetails = async (_, res) => {
    try {
        const details = await DetailService.getAllDetails();
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los detalles: ' + error.message });
    }
}

export const getDetailById = async (req, res) => {
    try {
        const detail = await DetailService.getDetailById(req.query.id);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el detalle: ' + error.message });
    }
}

export const createDetail = async (req, res) => {
    try {
        const detail = await DetailService.createDetail(req.body);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el detalle: ' + error.message });
    }
}

export const updateDetail = async (req, res) => {
    try {
        const detail = await DetailService.updateDetail(req.query.id, req.body);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el detalle: ' + error.message });
    }
}

export const deleteDetail = async (req, res) => {
    try {
        const detail = await DetailService.deleteDetail(req.query.id);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el detalle: ' + error.message });
    }
}
