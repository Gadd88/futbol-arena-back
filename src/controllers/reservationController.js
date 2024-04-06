import reservasModel from "../models/reservasModel.js";
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'


const getReservations = async (req,res) =>{
    try{
        const reservations = await reservasModel.find()
        res.status(200).json(reservations)
    }catch(error){
        console.log(error)
    }
}

const addReservation = async(req,res)=>{
    try{
        const {reservation_date,reservation_time,reservation_field,user_id} = req.body
        const user = UserModel.findById(user_id)
        if(user){
            const reservation = new reservasModel({
                reservation_id: crypto.randomUUID(),
                reservation_date,
                reservation_time,
                reservation_field,
                isAvailable: true,
                user_id,
            })
            await reservation.save()
            res.status(201).json({message: "Reserva agregada con exito"})
        }
    }catch(error){
        res.status(400).json({message: "Error al cargar la reserva"})
        console.log(error)
    }
}

export default {
    getReservations,
    addReservation,
}