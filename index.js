import express from 'express';
import cors from 'cors';
import 'dotenv/config'
//Consantes
const PORT = process.env.PORT ? process.env.PORT : 3001

const app = express()
//Middlewares
app.use(cors())
app.use(express.urlencoded({extended: true, limit:'50mb'}))
app.use(express.json())
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

//ruta bienvenida
app.get('/api', (_req, res, next) => {
    try{
        res.send('Hola mundo').end();
    } catch (err){
        console.log(err)
    }
})

app.listen(PORT, ()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})