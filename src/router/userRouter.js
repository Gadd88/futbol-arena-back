import express from 'express';
import usersControllers from '../controllers/usersControllers.js';

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

export default router