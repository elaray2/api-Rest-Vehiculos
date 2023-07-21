import Vehiculo from '../models/vehiculoModel.js';

// GET /api/vehiculos
export const findAllVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find({ precio: { $ne: 0 } });
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salió mal mientras se buscaban los vehiculos'
        });
    }
};

// GET /api/vehiculo/:id
export const findOneVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await Vehiculo.findOne({
            $or: [{ _id: id }, { descripcion: id }],
            costo: { $gt: 100000 }
        });

        if (!vehiculo) {
            return res.status(404).json({ message: 'No se encontró ningún vehiculo con el ID o descripcion proporcionados.' });
        }

        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocurrió un error al buscar el vehiculo.' });
    }
};

// POST /api/vehiculos
export const addVehiculo = async (req, res) => {
    try {
        const { descripcion, marca, costo } = req.body;
        const precio = costo * 1.1; // Aumento del 100% de impuestos

        const newVehiculo = new Vehiculo({
            descripcion: descripcion,
            marca: marca,
            costo: costo,
            precio: precio
        });

        const vehiculoSaved = await newVehiculo.save();
        res.status(201).json(vehiculoSaved);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salió mal mientras se agregaba el vehiculo'
        });
    }
};

// PATCH /api/vehiculos/:id
export const updateVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { costo, precio } = req.body;

        const vehiculo = await Vehiculo.findByIdAndUpdate(
            id,
            { $set: { costo: costo, precio: precio } },
            { new: true }
        );

        if (!vehiculo) {
            return res.status(404).json({ message: 'No se encontró ningún vehiculo con el ID proporcionado.' });
        }

        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocurrió un error al actualizar el vehiculo.' });
    }
};

// DELETE /api/vehiculo/:id
export const deleteVehiculo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVehiculo = await Vehiculo.findOneAndDelete({
            $or: [{ _id: id }, { descripcion: id }]
        });

        if (deletedVehiculo) {
            return res.json({ message: 'Vehiculo eliminado satisfactoriamente' });
        } else {
            return res.status(404).json({ message: 'No se encontró ningún vehiculo con el ID o descripcion proporcionados.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Ocurrió un error al eliminar el vehiculo.' });
    }
};
