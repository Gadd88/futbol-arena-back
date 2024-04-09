import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import router from './src/router/router.js'
import connectDB from './src/controllers/dbController.js';
//Consantes
const PORT = process.env.PORT ? process.env.PORT : 3001

const app = express()
//Middlewares
app.use(cors())
app.use(express.urlencoded({extended: true, limit:'50mb'}))
app.use(express.json())
// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', 'true')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept',
//     )
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//     next()
// })
app.use('/api', router);

const initApp = () => {
    try{
        connectDB()
        app.listen(PORT, ()=> {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

initApp()