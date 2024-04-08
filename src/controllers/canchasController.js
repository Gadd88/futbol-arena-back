import CanchasModel from "../models/canchasModel.js";
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js";
import ReservasModel from "../models/reservasModel.js";

const getCanchas = async (req, res) => {
    const { cancha_id, fecha_buscada } = req.body
    try{
        const [ canchaElegida ] = await CanchasModel.find({cancha_id : cancha_id})
        const reservas = await ReservasModel.find()
        const reservasEnCancha = reservas.filter(reserva => reserva.reservation_field_id === cancha_id && reserva.reservation_date === fecha_buscada)
        const turnosDisponibles = canchaElegida.cancha_turnos.map(turno => {
            for(let i = 0; i < reservasEnCancha.length; i++) {
                if(turno.hora === reservasEnCancha[i].reservation_time){
                    return{
                        ...turno,
                        disponible: false
                    }
                }
                return turno
            }
        })
        res.status(200).json(turnosDisponibles)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

const addCancha = async (req, res) => {
    const { cancha_nombre, cancha_detalle } = req.body

    const token = req.get('authorization').split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const { user_id } = decodedToken
    const usuarioDB = await UserModel.findOne({user_id})
    if(!usuarioDB.isAdmin){
        res.status(403).json({message: 'No tienes permiso para realizar esta operación'})
    }
    if(usuarioDB.isAdmin === true){
        const newCancha = CanchasModel({
            cancha_id: crypto.randomUUID(),
            cancha_nombre,
            cancha_detalle
        })
        await newCancha.save()
        res.status(201).json({message: 'Cancha agregada con éxito'})
    }
}


export default {
    getCanchas,
    addCancha,
}