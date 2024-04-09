import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const turnosSchema = new Schema({
    turno_id: {
        unique: true,
        type: String,
        required: true,
    },
    isReserved: {
        type: Boolean,
        default: false,
        required: true,
    },
    turno_hora: {
        type: String,
        required: true,
    }
})

const TurnosModel = mongoose.model('turns', turnosSchema, 'turns')

export default TurnosModel