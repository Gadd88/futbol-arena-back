import ProductModel from "../models/productModel";
import UserModel from "../models/userModel";

//agregar producto
const agregarProducto = async (req, res) => {
    try {
        
        const { producto, detalle, precio, stock } = req.body
        const usuario = await UserModel.findOne({email})
        if(usuario.isAdmin){
            const newProduct = new ProductModel({
                producto,
                detalle,
                precio,
                stock,
                producto_id: crypto.randomUUID(),
            })
            await newProduct.save()
            res.status(201).json({message: 'Producto agregado correctamente'})
        }else{
            res.status(400).json({message: 'No posee permisos para realizar esta acción'})
        }
    } catch (error) {
        res.stataus(400).json({message: 'Ocurrió un error en la solicitud'})
        console.log(error)
    }
}

//eliminar producto
const eliminarProducto = async (req,res) => {
    try {
        const { producto_id } = req.params
        const producto = await ProductModel.findByIdAndDelete(producto_id)
        res.status(200).json({message: "Producto eliminado"}, producto)
    }catch(err){
        console.log(err)
    }
}

//actualizar producto
const actualizarProducto = async (req,res) => {
    try{
        const {producto_id} = req.params
        const {producto, detalle, precio, stock} = req.body
        const productUpdated = await ProductModel.findByIdAndUpdate(
            producto_id,
            {
                producto,
                detalle,
                precio,
                stock
            },
            {new: true}
        )
        res.status(200).json({message: 'Producto actualizado'}, productUpdated)
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
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    venderProducto
}

