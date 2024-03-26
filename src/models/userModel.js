import mongoose from "mongoose";
import { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        user_id: {
            type: String,
            unique: true,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        telefono: String,
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        reservas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                default: [],
                ref: 'reservations',
            }
        ],
    },
    {
        versionKey: false
    }
);

const UserModel = mongoose.model('users', userSchema, 'users' )

export default UserModel