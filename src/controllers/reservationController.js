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
                    res.status(201).json({message: "Reserva agregada con exito"})
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

export default {
    getReservations,
    addReservation,
}