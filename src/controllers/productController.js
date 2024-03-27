import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// obtener productos
const obtenerProductos = async (req,res) =>{
    try{
        const productos = await ProductModel.find()
        res.status(200).json(productos)
    }catch(error){
        console.log(error)
    }
}

//agregar producto
const agregarProducto = async (req, res) => {
    try {
        const { producto, detalle, precio, stock } = req.body
        const token = req.get('authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const { user_id } = decodedToken
        const usuarioDB = await UserModel.findOne({user_id})
        if(usuarioDB.isAdmin === false){
            res.status(400).json({message: 'No posee permisos para realizar esta acción'})
            return
        }else{
            const newProduct = new ProductModel({
                producto,
                detalle,
                precio,
                stock,
                producto_id: crypto.randomUUID(),
            })
            await newProduct.save()
            res.status(201).json({message: 'Producto agregado correctamente', newProduct})
        }
    } catch (error) {
        res.status(400).json({message: 'Ocurrió un error en la solicitud'})
        console.log(error)
    }
}

//eliminar producto
const eliminarProducto = async (req,res) => {
    try {
        const { producto_id } = req.params
        const token = req.get('authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const { user_id } = decodedToken
        const usuarioDB = await UserModel.findOne({user_id})
        if(usuarioDB.isAdmin === true){
            await ProductModel.findOneAndDelete({producto_id})
            res.status(200).json({message: "Producto eliminado"})
        }else{
            res.status(400).json({message: 'No posees permisos para realizar esta acción'})
        }
    }catch(err){
        console.log(err)
    }
}

//actualizar producto
const actualizarProducto = async (req,res) => {
    try{
        const {producto_id} = req.params
        const {producto, detalle, precio, stock} = req.body
        const token = req.get('authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const { user_id } = decodedToken
        const usuarioDB = await UserModel.findOne({user_id})
        if(usuarioDB.isAdmin === true){
            const productUpdated = await ProductModel.findOneAndUpdate(
                {
                    producto_id: producto_id
                },
                {
                    producto,
                    detalle,
                    precio,
                    stock
                },
                {new: true}
            )
            res.status(200).json({message: 'Producto actualizado', productUpdated})
        }else{
            res.status(400).json({message: 'No posee permisos para realizar esta acción'})
        }
    }catch(err){
        console.log(err)
    }
}

//vender producto
const venderProducto = async (req,res) => {
    const { stock, producto_id } = req.body
    const producto = await ProductModel.findById(producto_id)
    if(!producto){
        res.status(404).json({message: 'No existe el producto'})
        return
    }
    if(producto && producto.stock > 0){
        producto.stock = producto.stock - stock
        if(producto.stock >= 0){
            producto.save()
            res.status(200).json({message: 'Gracias por su compra'})
        }else{
            res.status(500).json({message: 'No existen suficientes unidades en venta'})
        }
    }else{
        res.json({message: 'No existen suficientes productos en stock'})
    }
}



export default {
    obtenerProductos,
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    venderProducto
}

