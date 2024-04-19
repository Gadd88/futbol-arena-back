import CanchasModel from "../models/canchasModel.js";
import ReservasModel from "../models/reservasModel.js";
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
        const {reservation_date,reservation_time,reservation_field_id,user_id} = req.body
        if(!reservation_date || !reservation_time || !reservation_field_id) res.status(400).json({message: 'Faltan datos'})
        const user = await UserModel.find({user_id: user_id})
        if(user){
            try{
                const field_data = await CanchasModel.find({cancha_id: reservation_field_id})
                
                try{
                    const newReservation = new ReservasModel({
                        reservation_id: crypto.randomUUID(),
                        reservation_date,
                        reservation_time,
                        reservation_field_id,
                        reservation_field_name: field_data.cancha_nombre,
                        user_id,
                    })
                    await newReservation.save()
                    await UserModel.findOneAndUpdate({user_id: newReservation.user_id},{ $push: { reservas: newReservation.reservation_id } })
                    res.status(201).json({message: "Reserva agregada con exito",newReservation, user})
                }catch(err){
                    console.log(err)
                    res.status(500).json({message: 'Error al crear la reserva'})
                }
            }catch(err){
                console.log(err)
                res.status(500).json({message: 'Error en el servidor'})
            }
        }else{
            res.status(403).json({message:'Debes iniciar sesión para poder reservar una fecha'})
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message: "Error al cargar la reserva"})
    }
}

const deleteReservation = async (req,res) => {
    const { reservation_id } = req.params
    const { user_id, isAdmin } = req.body

    try{
        const [reserva] = await ReservasModel.find({reservation_id: reservation_id})
        if(reserva){
            if(reserva.user_id == user_id || isAdmin === true ){
                await UserModel.findOneAndUpdate({user_id: reserva.user_id}, { $pull: {reservas: reserva._id}})
                await ReservasModel.findOneAndDelete({reservation_id: reservation_id})
                return res.status(200).json({message: 'Reserva Eliminada'})
            }
        }
        return res.status(403).json({message: 'Solo el usuario que creó la reserva puede eliminarla'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }

}

export default {
    getReservations,
    addReservation,
    deleteReservation
}