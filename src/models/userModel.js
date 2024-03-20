import mongoose from "mongoose";
import { Schema } from 'mongoose';

const usersSchema = new Schema(
    {
        nombre: String,
        apellido: String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: Boolean
    },
    {
        versionKey: false
    }
);

const UserModel = mongoose.model('usuarios', usersSchema)

export default UserModel