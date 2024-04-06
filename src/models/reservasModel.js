import mongoose from "mongoose";
import { Schema } from 'mongoose';

const reservasSchema = new Schema({
    reservation_id: {
        type: String,
        required: true,
        unique: true,
    },
    reservation_date: {
        required: true,
        type: String
    },
    reservation_time: {
        required: true,
        type: String
    },
    reservation_field: {
        required: true,
        type: String
    },
    isAvailable:{
        required: true,
        type: Boolean
    },
    user_id: {
        required: true,
        type: String
    }
})

const ReservasModel = mongoose.model('reservations', reservasSchema, 'reservations')

export default ReservasModel