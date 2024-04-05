import express from 'express';
import usersControllers from '../controllers/usersControllers.js';
import productController from '../controllers/productController.js';
import userExtractor from '../services/userFinder.js';
import reservationController from '../controllers/reservationController.js'
const router = express.Router();

//obtener usuarios
router.get('/users', usersControllers.obtenerUsuarios)

//registro usuario
router.post('/registro', usersControllers.registroUsuario)

//login usuario
router.post('/login', usersControllers.loginUser)

//editar usuario
router.put('/users/:user_id', usersControllers.actualizarUsuario)

//delete usuario
router.delete('/users/:user_id', usersControllers.eliminarUsuario)

//obtener productos
router.get('/products', productController.obtenerProductos)

//agregar producto
router.post('/products', productController.agregarProducto)

//eliminar producto
router.delete('/products/:producto_id', productController.eliminarProducto)

//editar producto
router.put('/products/:producto_id', productController.actualizarProducto)

// obtener una reserva
router.get('/reservations', reservationController.getReservations)

// reservar una cancha

// eliminar una reserva

// editar una reserva





export default router