import { Schema, model } from "mongoose";

const vehiculoSchema = Schema({
    descripcion: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    costo: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Vehiculo', vehiculoSchema);
