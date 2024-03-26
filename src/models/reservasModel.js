import mongoose from "mongoose";
import { Schema } from 'mongoose';

const reservasSchema = new Schema({
    reserva_id: {
        type: String,
        required: true,
        unique: true,
    },
    fecha_reserva: {
        required: true,
        type: String
    },
    hora_reserva: {
        required: true,
        type: String
    },
    cancha_reserva: {
        required: true,
        type: String
    },
    user_id: String
})

const ReservasModel = mongoose.model('reservations', reservasSchema)