import TurnosModel from "../models/turnosModel.js"

const getTurnos = async (req, res) => {
    try{
        const turns = await TurnosModel.find()
        res.status(200).json(turns)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


export default {
    getTurnos
}